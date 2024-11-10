import {Component, EventEmitter, Output} from '@angular/core';
import {IonModal} from "@ionic/angular";

@Component({
  selector: 'app-filter-operations',
  templateUrl: './filter-operations.component.html',
  styleUrls: ['./filter-operations.component.scss'],
})
export class FilterOperationsComponent {

  @Output() filterApplied = new EventEmitter<{ cardID: string; phoneNumbers: string }>();

  filter = {
    cardID: "",
    phoneNumbers: ""
  };

  filterChips = {
    cardID: "",
    phoneNumbers: ""
  };

  constructor() {
  }

  applyFilters(modal: IonModal) {
    this.filterApplied.emit(this.filter);
    this.filterChips = this.filter;
    modal.dismiss();
  }

  resetFilters(modal: IonModal) {
    this.filter = {
      cardID: "",
      phoneNumbers: ""
    };
    this.filterApplied.emit(this.filter);
    this.filterChips = this.filter;
    modal.dismiss();
  }

  clearFilterChip(chipKey: 'cardID' | 'phoneNumbers') {
    this.filter[chipKey] = "";
    this.filterChips[chipKey] = "";
    this.filterApplied.emit(this.filter);
    this.filterChips = this.filter;
  }

}
