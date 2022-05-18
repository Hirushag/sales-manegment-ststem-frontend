import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAddingfoodComponent } from './create-addingfood.component';

describe('CreateAddingfoodComponent', () => {
  let component: CreateAddingfoodComponent;
  let fixture: ComponentFixture<CreateAddingfoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAddingfoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAddingfoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
