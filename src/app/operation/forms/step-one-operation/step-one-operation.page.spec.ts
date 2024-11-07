import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StepOneOperationPage } from './step-one-operation.page';

describe('StepOneOperationPage', () => {
  let component: StepOneOperationPage;
  let fixture: ComponentFixture<StepOneOperationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StepOneOperationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
