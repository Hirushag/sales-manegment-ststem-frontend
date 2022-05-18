import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CsvDataService } from 'src/app/services/csv-data.service';
import { DeviceDataTable } from 'src/app/shared/models/device.model';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
declare const $: any;

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.scss'],
})
export class ViewVehicleComponent implements OnInit {
  public dataTable: DeviceDataTable;
  constructor(
    private router: Router,
    private csvService: CsvDataService,
    private notificationUtils: NotificationUtilsService,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    this.getVehicles();
    this.dataTable = {
      headerRow: [
        'Vehicle Id',
        'Vehicle Brand',
        'Vehicle Name',
        'Colour',
        'Number',
        'Actions',
      ],
      footerRow: [
        'Vehicle Id',
        'Vehicle Brand',
        'Vehicle Name',
        'Colour',
        'Number',
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
  getVehicles() {
    this.notificationUtils.showMainLoading();
    this.vehicleService.getAllVehicles().subscribe(
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
  deleteVehicle(id) {
    this.notificationUtils
      .promptConfirmation('This will remove selected vehicle.')
      .then(
        () => {
          this.notificationUtils.showMainLoading();
          this.vehicleService.deleteVehicle(id).subscribe(
            (data) => {
              this.notificationUtils.showSuccessMessage('Vehicle deleted.');
              this.notificationUtils.hideMainLoading();
              this.getVehicles();
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

  editVehicle(id) {
    console.log(id);
    this.navigateWithQuery('/vehicle/edit', id);
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
          [this.dataTable.headerRow[1]]: line.vehicle_brand,
          [this.dataTable.headerRow[2]]: line.vehicle_name,
          [this.dataTable.headerRow[3]]: line.colour,
          [this.dataTable.headerRow[4]]: line.address2,
          [this.dataTable.headerRow[7]]: line.number,
        };
        items.push(csvLine);
        console.log(csvLine);
      });

      this.csvService.exportToCsv('Vehicle Data.csv', items);
    } else {
      this.notificationUtils.showInfoMessage('No Data Found.');
    }
  }
}
