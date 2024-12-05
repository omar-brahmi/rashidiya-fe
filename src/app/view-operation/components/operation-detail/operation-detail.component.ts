import {Component, inject, Input} from '@angular/core';
import {Operation} from "../../../core/models/operation.model";
import {DatePipe, NgClass} from "@angular/common";
import {HomePageModule} from "../../../home/home.module";
import {IonicModule, NavController} from "@ionic/angular";
import {ListPageModule} from "../../../operation/list/list.module";
import {NgxIonicImageViewerModule} from "@herdwatch-apps/ngx-ionic-image-viewer";
import {Status} from "../../../core/models/enumerations/status.enum";
import {getStateDisplayName, State} from "../../../core/models/enumerations/state.enum";
import {formatNumberToCash} from "../../../core/directives/cash-format.directive";
import {OperationService} from "../../../services/operation.service";

@Component({
  selector: 'app-operation-detail',
  templateUrl: './operation-detail.component.html',
  styleUrls: ['./operation-detail.component.scss'],
  imports: [
    DatePipe,
    HomePageModule,
    IonicModule,
    ListPageModule,
    NgxIonicImageViewerModule,
    NgClass
  ],
  standalone: true
})
export class OperationDetailComponent {

  @Input() indexView: number = 0;
  @Input() operation: Operation | null = null;

  #operationService: OperationService = inject(OperationService);

  protected readonly formatNumberToCash = formatNumberToCash;
  protected readonly getStateDisplayName = getStateDisplayName;
  protected readonly Status = Status;
  protected readonly State = State;

  constructor(private navController: NavController) {
  }

  redirectToUpdate() {
    if (this.operation) {
      this.#operationService.updateOperationSubject(this.operation);
      this.navController.navigateRoot("/form/step-one-operation/" + this.operation?.operationID);
    }
  }

  redirectToReimbursement() {
    if (this.operation) {
      this.#operationService.updateOperationSubject(this.operation);
      this.navController.navigateRoot(['/operations/reimbursement/' + this.operation.operationID]);
    }
  }

  redirectToCancel() {
    if (this.operation) {
      this.#operationService.updateOperationSubject(this.operation);
      this.navController.navigateRoot(['/operations/cancel/' + this.operation.operationID]);
    }
  }

}
