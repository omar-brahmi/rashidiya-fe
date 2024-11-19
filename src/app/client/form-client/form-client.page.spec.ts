import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormClientPage } from './form-client.page';

describe('FormClientPage', () => {
  let component: FormClientPage;
  let fixture: ComponentFixture<FormClientPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
