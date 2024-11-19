import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListClientPage } from './list-client.page';

describe('ListClientPage', () => {
  let component: ListClientPage;
  let fixture: ComponentFixture<ListClientPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
