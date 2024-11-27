import {Component, Input} from '@angular/core';
import {Operation} from "../../../core/models/operation.model";
import {formatNumberToCash} from "../../../core/directives/cash-format.directive";
import {OperationService} from "../../../services/operation.service";
import {Router} from "@angular/router";
import {Status} from "../../../core/models/enumerations/status.enum";

@Component({
  selector: 'app-card-operation',
  templateUrl: './card-operation.component.html',
  styleUrls: ['./card-operation.component.scss'],
})
export class CardOperationComponent {
  protected readonly formatNumberToCash = formatNumberToCash;

  @Input() operation: Operation | null = null;

  constructor(private operationService: OperationService, private router: Router) {
  }

  redirectToView() {
    if (this.operation) {
      this.operationService.updateOperationSubject(this.operation);
      this.router.navigate(['/operations/view/' + this.operation.operationID]);
    }
  }

  redirectToReimbursement() {
    if (this.operation) {
      this.operationService.updateOperationSubject(this.operation);
      this.router.navigate(['/operations/reimbursement/' + this.operation.operationID]);
    }
  }

  redirectToCancel() {
    if (this.operation) {
      this.operationService.updateOperationSubject(this.operation);
      this.router.navigate(['/operations/cancel/' + this.operation.operationID]);
    }
  }

  protected readonly Status = Status;
}
