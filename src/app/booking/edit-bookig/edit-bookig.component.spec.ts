import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookigComponent } from './edit-bookig.component';

describe('EditBookigComponent', () => {
  let component: EditBookigComponent;
  let fixture: ComponentFixture<EditBookigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBookigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBookigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
