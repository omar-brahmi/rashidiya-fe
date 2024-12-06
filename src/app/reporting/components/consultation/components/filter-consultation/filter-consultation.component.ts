import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {Status} from "../../../../../core/models/enumerations/status.enum";
import {IonModal} from "@ionic/angular";
import {getStateDisplayName, State} from "../../../../../core/models/enumerations/state.enum";

@Component({
  selector: 'app-filter-consultation',
  templateUrl: './filter-consultation.component.html',
  styleUrls: ['./filter-consultation.component.scss'],
})
export class FilterConsultationComponent {

  @Output() filterApplied = new EventEmitter<{
    createdAt: string;
    phoneNumbers: string;
    idCard: string;
    cash: string;
    status: string;
    operationFirstName: string;
    operationLastName: string;
  }>();

  @ViewChild(IonModal) modal!: IonModal;

  protected readonly getStateDisplayName = getStateDisplayName;
  protected readonly State = State;
  protected readonly Status = Status;

  searchForm = {
    createdAt: '',
    phoneNumbers: '',
    idCard: '',
    cash: '',
    status: '',
    operationFirstName: '',
    operationLastName: ''
  };

  activeSearchForm = {
    createdAt: '',
    phoneNumbers: '',
    idCard: '',
    cash: '',
    status: '',
    operationFirstName: '',
    operationLastName: ''
  };

  maxDate: string = new Date().toISOString().split('T')[0];

  search() {
    this.filterApplied.emit(this.searchForm);
    this.activeSearchForm = {...this.searchForm};
  }

  clearFilterChip(chipKey: 'createdAt' | 'phoneNumbers' | 'idCard' | 'cash' | 'status' | 'operationFirstName' | 'operationLastName') {
    this.searchForm[chipKey] = "";
    this.activeSearchForm[chipKey] = "";
    this.filterApplied.emit(this.searchForm);
  }

  hasActiveFilters(): boolean {
    return Object.values(this.activeSearchForm).some(value => value && value!.length > 0);
  }

  resetForm() {
    this.searchForm = {
      createdAt: '',
      phoneNumbers: '',
      idCard: '',
      cash: '',
      status: '',
      operationFirstName: '',
      operationLastName: ''
    };
    this.filterApplied.emit(this.searchForm);
    this.activeSearchForm = {...this.searchForm};
  }

}
