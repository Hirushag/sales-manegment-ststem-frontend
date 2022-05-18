import { OrderService } from '../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CsvDataService } from 'src/app/services/csv-data.service';
import { DeviceDataTable } from 'src/app/shared/models/device.model';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
declare const $: any;

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss'],
})
export class ViewOrderComponent implements OnInit {
  public dataTable: DeviceDataTable;
  constructor(
    private router: Router,
    private csvService: CsvDataService,
    private notificationUtils: NotificationUtilsService,
    private vehicleService: OrderService
  ) {}

  ngOnInit(): void {
    this.getOrders();
    this.dataTable = {
      headerRow: [
        'Product ID',
        'User ID',
        'Product Price',
        'Quantity',
        'Amount',
        'Delivery Address',
        'Recipent Name',
        'Actions',
      ],
      footerRow: [
        'Product ID',
        'User ID',
        'Product Price',
        'Quantity',
        'Amount',
        'Delivery Address',
        'Recipent Name',
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
  getOrders() {
    this.notificationUtils.showMainLoading();
    this.vehicleService.getAllOrders().subscribe(
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
  deleteOrder(id) {
    this.notificationUtils
      .promptConfirmation('This will remove selected order.')
      .then(
        () => {
          this.notificationUtils.showMainLoading();
          this.vehicleService.deleteOrder(id).subscribe(
            (data) => {
              this.notificationUtils.showSuccessMessage('Order deleted.');
              this.notificationUtils.hideMainLoading();
              this.getOrders();
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

  editOrder(id) {
    console.log(id);
    this.navigateWithQuery('/order/edit', id);
  }

  navigateWithQuery(path, id) {
    this.router.navigate([path], {
      queryParams: {
        id: id,
      },
      queryParamsHandling: 'merge',
    });
  }

}
