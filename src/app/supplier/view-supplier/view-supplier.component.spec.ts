import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSupplierComponent } from './view-supplier.component';

describe('ViewStockComponent', () => {
  let component: ViewSupplierComponent;
  let fixture: ComponentFixture<ViewSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
