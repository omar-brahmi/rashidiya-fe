import {Component} from '@angular/core';
import {formatNumberToCash} from "../../../core/directives/cash-format.directive";

@Component({
  selector: 'app-balance-per-day',
  templateUrl: './balance-per-day.component.html',
  styleUrls: ['./balance-per-day.component.scss'],
})
export class BalancePerDayComponent {

  protected readonly formatNumberToCash = formatNumberToCash;

  total: { circulationCash: number; totalCash: number } = {
    circulationCash: 0,
    totalCash: 0
  }

  handleBalancePerDay($event: { circulationCash: number; totalCash: number }) {
    this.total = $event;
  }
  
}
