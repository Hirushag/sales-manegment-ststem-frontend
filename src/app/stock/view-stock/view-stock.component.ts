import { StockService } from 'src/app/services/stock.service';
import { Component, OnInit } from '@angular/core';
import { DeviceDataTable } from 'src/app/shared/models/device.model';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { Router } from '@angular/router';
import { CsvDataService } from 'src/app/services/csv-data.service';
declare const $: any;

@Component({
  selector: 'app-view-stock',
  templateUrl: './view-stock.component.html',
  styleUrls: ['./view-stock.component.scss'],
})
export class ViewStockComponent implements OnInit {
  public dataTable: DeviceDataTable;

  constructor(
    private router: Router,
    private csvService: CsvDataService,
    private notificationUtils: NotificationUtilsService,
    private stockservice: StockService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.dataTable = {
      headerRow: [
        'Stock Id',
        'Category Type',
        'Category Name',
        'inStock',
        'useStock',
        'wasteStock',
        'Date',
        'Actions',
      ],
      footerRow: [
        'Stock Id',
        'Category Type',
        'Category Name',
        'inStock',
        'useStock',
        'wasteStock',
        'Date',
        'Actions',
      ],
      dataRows: [],
    };
    this.initializeDataTable();
  }

  loadData() {
    this.notificationUtils.showMainLoading();
    this.stockservice.getAllStock().subscribe(
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
    console.log('working');
    if (this.dataTable.dataRows.length > 0) {
      const items = [];

      this.dataTable.dataRows.forEach((line) => {
        const csvLine = {
          [this.dataTable.headerRow[0]]: line.stock_id,
          [this.dataTable.headerRow[1]]: line.categoryType,
          [this.dataTable.headerRow[2]]: line.categoryName,
          [this.dataTable.headerRow[3]]: line.inStock,
          [this.dataTable.headerRow[4]]: line.useStock,
          [this.dataTable.headerRow[5]]: line.wasteStock,
          [this.dataTable.headerRow[6]]: line.Date,
        };
        items.push(csvLine);
      });

      this.csvService.exportToCsv('Stock Data.csv', items);
    } else {
      this.notificationUtils.showInfoMessage('No Data Found.');
    }
  }

  editStock(id) {
    this.navigateWithQuery('/stock/edit', id);
  }

  navigateWithQuery(path, id) {
    this.router.navigate([path], {
      queryParams: {
        stock_id: id,
      },
      queryParamsHandling: 'merge',
    });
  }
  deleteStock(stock_id) {
    this.notificationUtils
      .promptConfirmation('This will remove selected employee.')
      .then(
        () => {
          this.notificationUtils.showMainLoading();
          this.stockservice.deleteStock(stock_id).subscribe(
            (data) => {
              this.notificationUtils.showSuccessMessage('Stock deleted.');
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
