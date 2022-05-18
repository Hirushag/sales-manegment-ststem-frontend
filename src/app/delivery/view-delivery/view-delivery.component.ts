import { DeliveryService } from './../../services/delivery.service';
import { Component, OnInit } from '@angular/core';
import { DeviceDataTable } from 'src/app/shared/models/device.model';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { Router } from '@angular/router';
import { CsvDataService } from 'src/app/services/csv-data.service';
declare const $: any;

@Component({
  selector: 'app-view-delivery',
  templateUrl: './view-delivery.component.html',
  styleUrls: ['./view-delivery.component.scss'],
})
export class ViewDeliveryComponent implements OnInit {
  public dataTable: DeviceDataTable;

  constructor(
    private router: Router,
    private csvService: CsvDataService,
    private notificationUtils: NotificationUtilsService,
    private deliveryservice: DeliveryService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.dataTable = {
      headerRow: [
        'Delivery Id',
        'Rider Id',
        'First Name',
        'Email',
        'Delivery Date',
        'Address 1',
        'Address 2',
        'Contact',
        'Actions',
      ],
      footerRow: [
        'Delivery Id',
        'Rider Id',
        'First Name',
        'Email',
        'Delivery Date',
        'Address 1',
        'Address 2',
        'Contact',
        'Actions',
      ],
      dataRows: [],
    };
    this.initializeDataTable();
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
  loadData() {
    this.notificationUtils.showMainLoading();
    this.deliveryservice.getAllDeliverys().subscribe(
      (data) => {
        console.log(data);
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

  deleteDelivery(id) {
    console.log(id);
    this.notificationUtils
      .promptConfirmation('This will remove selected Delivery.')
      .then(
        () => {
          this.notificationUtils.showMainLoading();
          this.deliveryservice.deleteDelivery(id).subscribe(
            (data) => {
              this.notificationUtils.showSuccessMessage('Delivery deleted.');
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

  editDelivery(id) {
    this.navigateWithQuery('/delivery/edit', id);
  }

  navigateWithQuery(path, id) {
    this.router.navigate([path], {
      queryParams: {
        id: id,
      },
      queryParamsHandling: 'merge',
    });
  }
  saveAsCSV() {
    if (this.dataTable.dataRows.length > 0) {
      const items = [];

      this.dataTable.dataRows.forEach((line) => {
        const csvLine = {
          [this.dataTable.headerRow[0]]: line.id,
          [this.dataTable.headerRow[1]]: line.rider_id,
          [this.dataTable.headerRow[2]]: line.name,
          [this.dataTable.headerRow[3]]: line.email,
          [this.dataTable.headerRow[4]]: line.dekivery_date,
          [this.dataTable.headerRow[5]]: line.address1,
          [this.dataTable.headerRow[6]]: line.address1,
          [this.dataTable.headerRow[7]]: line.contact,
        };
        items.push(csvLine);
      });

      this.csvService.exportToCsv('Supplier Data.csv', items);
    } else {
      this.notificationUtils.showInfoMessage('No Data Found.');
    }
  }
}
