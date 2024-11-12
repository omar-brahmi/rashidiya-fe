import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-card-reminder',
  templateUrl: './card-reminder.component.html',
  styleUrls: ['./card-reminder.component.scss'],
})
export class CardReminderComponent {

  @Input() index: number = 0;

  gradients: string[] = [
    'gradient-1',
    'gradient-2',
    'gradient-3',
    'gradient-4',
    'gradient-5',
    'gradient-6'
  ];

  constructor() {
  }

  getGradientClass(index: number): string {
    return this.gradients[index % this.gradients.length];
  }

}
