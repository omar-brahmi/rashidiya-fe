import {Component, EventEmitter, Output} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-filter-reminder',
  templateUrl: './filter-reminder.component.html',
  standalone: true,
  imports: [
    IonicModule,
    FormsModule
  ],
  styleUrls: ['./filter-reminder.component.scss']
})
export class FilterReminderComponent {

  maxDate: string = new Date().toISOString().split('T')[0];
  dateFilter: string = this.maxDate;

  @Output() filterChange: EventEmitter<string> = new EventEmitter()

  constructor() {
  }

}

