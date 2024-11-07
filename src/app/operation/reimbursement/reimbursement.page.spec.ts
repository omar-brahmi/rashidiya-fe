import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReimbursementPage } from './reimbursement.page';

describe('ReimbursementPage', () => {
  let component: ReimbursementPage;
  let fixture: ComponentFixture<ReimbursementPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbursementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
