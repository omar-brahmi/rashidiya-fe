import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StepTwoOperationPage } from './step-two-operation.page';

describe('StepTwoOperationPage', () => {
  let component: StepTwoOperationPage;
  let fixture: ComponentFixture<StepTwoOperationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StepTwoOperationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
