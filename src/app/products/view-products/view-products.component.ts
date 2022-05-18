import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { DeviceDataTable } from 'src/app/shared/models/device.model';
declare const $: any;

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent implements OnInit {

  public dataTable: DeviceDataTable;
  constructor(
    private router: Router,
    private notificationUtils: NotificationUtilsService,
    private productService:ProductService
  ) { }

  ngOnInit(): void {
    this.getProducts()
    this.dataTable = {
      headerRow: [
        'Name',
        'Description',
        'Category',
        'Price',
        'Quantity',
        'Status',
        'Actions',
      ],
      footerRow: [
        'Name',
        'Description',
        'Category',
        'Price',
        'Quantity',
        'Status',
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

  getProducts() {
    this.notificationUtils.showMainLoading();
    this.productService.getAllProdutcs().subscribe(
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
  deleteProduct(id) {
    this.notificationUtils
      .promptConfirmation('This will remove selected product.')
      .then(
        () => {
          this.notificationUtils.showMainLoading();
          this.productService.deleteProduct(id).subscribe(
            (data) => {
              this.notificationUtils.showSuccessMessage('Product deleted.');
              this.notificationUtils.hideMainLoading();
              this.getProducts();
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

  editProduct(id) {
    console.log(id);
    this.navigateWithQuery('/products/edit', id);
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
