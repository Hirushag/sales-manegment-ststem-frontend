import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

declare const $: any;

// Metadata
export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  ab: string;
  type?: string;
  active: boolean;
}

// Menu Items
export const ROUTES: RouteInfo[] = [


  {
    path: '/user',
    title: 'Users',
    type: 'sub',
    icontype: 'person',
    collapse: 'user',
    children: [
      { path: 'view', title: 'View Users', ab: 'VU', active: true },
      { path: 'create', title: 'Create Users', ab: 'CU', active: true },
      { path: 'edit', title: 'Edit Users', ab: 'EU', active: false },
    ],
  },
  {
    path: '/products',
    title: 'Products',
    type: 'sub',
    icontype: 'person',
    collapse: 'products',
    children: [
      { path: 'view', title: 'View Products', ab: 'VP', active: true },
      { path: 'create', title: 'Create Products', ab: 'CP', active: true },
      { path: 'edit', title: 'Edit Products', ab: 'EP', active: false },
    ],
  },

  

  
  
 
 

  
];

@Component({
  selector: 'app-sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  ps: any;
  userName: any;

  constructor() {}

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  ngOnInit() {
    if (sessionStorage.getItem('role') === 'CUSTOMER') {
      this.menuItems = [
        {
          path: '/booking',
          title: 'Booking',
          type: 'sub',
          icontype: 'devices_other',
          collapse: 'booking',
          children: [
            {
              path: 'create',
              title: 'Create booking',
              ab: 'CB',
              active: false,
            },
            { path: 'edit', title: 'Edit booking', ab: 'EB', active: true },
          ],
        },
      ];
    } else {
      this.menuItems = ROUTES.filter((menuItem) => menuItem);
    }
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemSidebar = <HTMLElement>(
        document.querySelector('.sidebar .sidebar-wrapper')
      );
      this.ps = new PerfectScrollbar(elemSidebar);
    }
  }

  updatePS(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      this.ps.update();
    }
  }

  isMac(): boolean {
    let bool = false;
    if (
      navigator.platform.toUpperCase().indexOf('MAC') >= 0 ||
      navigator.platform.toUpperCase().indexOf('IPAD') >= 0
    ) {
      bool = true;
    }
    return bool;
  }
}
