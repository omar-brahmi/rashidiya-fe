import {Component, Input} from '@angular/core';
import {formatNumberToCash} from "../../../../../core/directives/cash-format.directive";
import {Status} from "../../../../../core/models/enumerations/status.enum";
import {OperationClass} from "../../../../../core/models/operation.model";
import {getStateDisplayName} from "../../../../../core/models/enumerations/state.enum";

@Component({
  selector: 'app-card-consultation',
  templateUrl: './card-consultation.component.html',
  styleUrls: ['./card-consultation.component.scss']
})
export class CardConsultationComponent {

  @Input() operation: OperationClass | null = null;

  protected readonly formatNumberToCash = formatNumberToCash;
  protected readonly getStateDisplayName = getStateDisplayName;
  protected readonly Status = Status;
}
