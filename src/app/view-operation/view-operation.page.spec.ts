import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewOperationPage } from './view-operation.page';

describe('ViewOperationPage', () => {
  let component: ViewOperationPage;
  let fixture: ComponentFixture<ViewOperationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOperationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
