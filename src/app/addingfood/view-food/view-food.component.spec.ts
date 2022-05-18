import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAddingfoodComponent } from './view-addingfood.component';

describe('ViewAddingfoodComponent', () => {
  let component: ViewAddingfoodComponent;
  let fixture: ComponentFixture<ViewAddingfoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAddingfoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAddingfoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
