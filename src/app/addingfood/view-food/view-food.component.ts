import { AddingfoodService } from './../../services/addingfood.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CsvDataService } from 'src/app/services/csv-data.service';
import { DeviceDataTable } from 'src/app/shared/models/device.model';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
declare const $: any;

@Component({
  selector: 'app-view-food',
  templateUrl: './view-food.component.html',
  styleUrls: ['./view-food.component.scss'],
})
export class ViewFoodComponent implements OnInit {
  public dataTable: DeviceDataTable;
  constructor(
    private router: Router,
    private csvService: CsvDataService,
    private notificationUtils: NotificationUtilsService,
    private addingfoodService: AddingfoodService
  ) {}

  ngOnInit(): void {
    this.getAddingfoods();
    this.dataTable = {
      headerRow: [
        'Food Id',
        'Food Name',
        'Food Price',
        'Food Quantity',
        'Actions',
      ],
      footerRow: [
        'Food Id',
        'Food Name',
        'Food Price',
        'Food Quantity',
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
  getAddingfoods() {
    this.notificationUtils.showMainLoading();
    this.addingfoodService.getAllAddingfoods().subscribe(
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
  deleteFood(food_id) {
    this.notificationUtils
      .promptConfirmation('This will remove selected addingfood.')
      .then(
        () => {
          this.notificationUtils.showMainLoading();
          this.addingfoodService.deleteFood(food_id).subscribe(
            (data) => {
              this.notificationUtils.showSuccessMessage('Food deleted.');
              this.notificationUtils.hideMainLoading();
              this.getAddingfoods();
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

  editFood(food_id) {
    console.log(food_id);
    this.navigateWithQuery('/addingfood/edit', food_id);
  }

  navigateWithQuery(path, food_id) {
    this.router.navigate([path], {
      queryParams: {
        food_id: food_id,
      },
      queryParamsHandling: 'merge',
    });
  }
  saveAsCSV() {
    if (this.dataTable.dataRows.length > 0) {
      const items = [];

      this.dataTable.dataRows.forEach((line) => {
        const csvLine = {
          [this.dataTable.headerRow[0]]: line.food_id,
          [this.dataTable.headerRow[1]]: line.food_name,
          [this.dataTable.headerRow[2]]: line.food_price,
          [this.dataTable.headerRow[3]]: line.food_quantity,
        };
        items.push(csvLine);
        console.log(csvLine);
      });

      this.csvService.exportToCsv('Addingfood Data.csv', items);
    } else {
      this.notificationUtils.showInfoMessage('No Data Found.');
    }
  }
}
