import { BookingService } from 'src/app/services/booking.service';
import { Component, OnInit } from '@angular/core';
import { DeviceDataTable } from 'src/app/shared/models/device.model';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { Router } from '@angular/router';
import { CsvDataService } from 'src/app/services/csv-data.service';
declare const $: any;

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.scss'],
})
export class ViewBookingComponent implements OnInit {
  public dataTable: DeviceDataTable;

  constructor(
    private router: Router,
    private csvService: CsvDataService,
    private notificationUtils: NotificationUtilsService,
    private bookingservice: BookingService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.dataTable = {
      headerRow: [
        'Booking Id',
        'First Name',
        'Last Name',
        'Contact',
        'Date And Time',
        'No of Person',
        'Emial',
        'Actions',
      ],
      footerRow: [
        'Booking Id',
        'First Name',
        'Last Name',
        'Contact',
        'Date And Time',
        'No of Person',
        'Emial',
        'Actions',
      ],
      dataRows: [],
    };
    this.initializeDataTable();
  }
  loadData() {
    this.notificationUtils.showMainLoading();
    this.bookingservice.getAllBookings().subscribe(
      (data) => {
        this.destroyDataTable();
        this.dataTable.dataRows = data;
        this.notificationUtils.hideMainLoading();
        this.initializeDataTable();
      },
      (error) => {
        this.notificationUtils.showErrorMessage(error.message);
        this.notificationUtils.hideMainLoading();
      }
    );
  }

  destroyDataTable() {
    $('#dataTable').DataTable().destroy();
  }
  initializeDataTable() {
    $(document).ready(() => {
      $('#dataTable').DataTable({
        pagingType: 'full_numbers',
        lengthMenu: [
          [10, 25, 50],
          [10, 25, 50],
        ],
        responsive: true,
        language: {
          search: '_INPUT_',
          searchPlaceholder: 'Search records',
        },
      });
    });
  }
  saveAsCSV() {
    if (this.dataTable.dataRows.length > 0) {
      const items = [];

      this.dataTable.dataRows.forEach((line) => {
        const csvLine = {
          [this.dataTable.headerRow[0]]: line.booking_id,
          [this.dataTable.headerRow[1]]: line.firstName,
          [this.dataTable.headerRow[2]]: line.lastName,
          [this.dataTable.headerRow[3]]: line.contact,
          [this.dataTable.headerRow[4]]: line.date,
          [this.dataTable.headerRow[5]]: line.person,
          [this.dataTable.headerRow[4]]: line.email,
        };
        items.push(csvLine);
      });

      this.csvService.exportToCsv('Employee Data.csv', items);
    } else {
      this.notificationUtils.showInfoMessage('No Data Found.');
    }
  }
  editBooking(id) {
    this.navigateWithQuery('/booking/edit', id);
  }

  navigateWithQuery(path, id) {
    this.router.navigate([path], {
      queryParams: {
        booking_id: id,
      },
      queryParamsHandling: 'merge',
    });
  }
  deleteBooking(booking_id) {
    this.notificationUtils
      .promptConfirmation('This will remove selected employee.')
      .then(
        () => {
          this.notificationUtils.showMainLoading();
          this.bookingservice.deleteBooking(booking_id).subscribe(
            (data) => {
              this.notificationUtils.showSuccessMessage('Booking deleted.');
              this.notificationUtils.hideMainLoading();
              this.loadData();
            },
            (error) => {
              this.notificationUtils.showErrorMessage(error.message);
              this.notificationUtils.hideMainLoading();
            }
          );
        },
        () => {}
      );
  }
}
