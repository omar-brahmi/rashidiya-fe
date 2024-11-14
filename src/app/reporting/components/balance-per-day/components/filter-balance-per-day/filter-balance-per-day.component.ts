import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {Client} from "../../../../../core/models/client.model";
import {OperationService} from "../../../../../services/operation.service";

@Component({
  selector: 'app-filter-balance-per-day',
  templateUrl: './filter-balance-per-day.component.html',
  styleUrls: ['./filter-balance-per-day.component.scss'],
})
export class FilterBalancePerDayComponent implements OnInit {

  #operationService: OperationService = inject(OperationService);

  client: Client | null = null;
  maxDate: string = new Date().toISOString().split('T')[0];
  dateFilter: string = this.maxDate;

  @Output() handleBalancePerDay: EventEmitter<{ circulationCash: number, totalCash: number }> = new EventEmitter()

  constructor() {
  }

  ngOnInit(): void {
    this.applyFilter();
  }

  handleSelectedClient($event: Client) {
    this.client = $event;
    this.applyFilter();
  }

  applyFilter() {
    this.#operationService.findBalancePerDayOperations(this.dateFilter, this.client?.idCard).subscribe({
      next: value => {
        this.handleBalancePerDay.emit(value);
      }
    });
  }

  resetFilter() {
    this.client = null;
    this.dateFilter = this.maxDate;
  }

}
