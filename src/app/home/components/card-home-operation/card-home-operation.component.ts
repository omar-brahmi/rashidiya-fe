import {Component, Input} from '@angular/core';
import {Operation} from "../../../core/models/operation.model";
import {DatePipe} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {formatNumberToCash} from "../../../core/directives/cash-format.directive";

@Component({
  selector: 'app-card-home-operation',
  templateUrl: './card-home-operation.component.html',
  styleUrls: ['./card-home-operation.component.scss'],
  imports: [
    DatePipe,
    IonicModule
  ],
  standalone: true
})
export class CardHomeOperationComponent {

  @Input() operation: Operation | null = null;

  protected readonly formatNumberToCash = formatNumberToCash;
}
