import { SupplierService } from 'src/app/services/supplier.service';
import { Component, OnInit } from '@angular/core';
import { DeviceDataTable } from 'src/app/shared/models/device.model';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { Router } from '@angular/router';
import { CsvDataService } from 'src/app/services/csv-data.service';
declare const $: any;

@Component({
  selector: 'app-view-supplier',
  templateUrl: './view-supplier.component.html',
  styleUrls: ['./view-supplier.component.scss'],
})
export class ViewSupplierComponent implements OnInit {
  public dataTable: DeviceDataTable;

  constructor(
    private router: Router,
    private csvService: CsvDataService,
    private notificationUtils: NotificationUtilsService,
    private stockservice: SupplierService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.dataTable = {
      headerRow: [
        'Name',
        'Company Name',
        'Address',
        'Phone',
        'Email',
        'Category',
        'Actions',
      ],
      footerRow: [
        'Name',
        'Company Name',
        'Address',
        'Phone',
        'Email',
        'Category',
        'Actions',
      ],
      dataRows: [],
    };
    this.initializeDataTable();
  }

  loadData() {
    this.notificationUtils.showMainLoading();
    this.stockservice.getAllSuppliers().subscribe(
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



  editSupplier(id) {
    this.navigateWithQuery('/supplier/edit', id);
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
      .promptConfirmation('This will remove selected supplier.')
      .then(
        () => {
          this.notificationUtils.showMainLoading();
          this.stockservice.deleteSupplier(stock_id).subscribe(
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
