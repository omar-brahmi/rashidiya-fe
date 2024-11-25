import {Component, EventEmitter, Output} from '@angular/core';
import {IonModal} from "@ionic/angular";

@Component({
  selector: 'app-filter-client',
  templateUrl: './filter-client.component.html',
  styleUrls: ['./filter-client.component.scss'],
})
export class FilterClientComponent {

  @Output() filterApplied = new EventEmitter<{
    cardID: string;
    phoneNumbers: string;
    firstName: string;
    lastName: string;
  }>();

  filter = {
    cardID: "",
    phoneNumbers: "",
    firstName: "",
    lastName: ""
  };

  filterChips = {
    cardID: "",
    phoneNumbers: "",
    firstName: "",
    lastName: ""
  };

  constructor() {
  }

  applyFilters(modal: IonModal) {
    this.filterApplied.emit(this.filter);
    this.filterChips = {...this.filter};
    modal.dismiss();
  }

  resetFilters(modal: IonModal) {
    this.filter = {
      cardID: "",
      phoneNumbers: "",
      firstName: "",
      lastName: ""
    };
    this.filterApplied.emit(this.filter);
    this.filterChips = {...this.filter};
    modal.dismiss();
  }

  clearFilterChip(chipKey: 'cardID' | 'phoneNumbers' | 'firstName' | 'lastName') {
    this.filter[chipKey] = "";
    this.filterChips[chipKey] = "";
    this.filterApplied.emit(this.filter);
  }

  hasActiveFilters(): boolean {
    return Object.values(this.filterChips).some(value => value !== "");
  }

  getActiveFiltersCount(): number {
    return Object.values(this.filterChips).filter(value => value !== "").length;
  }
}
