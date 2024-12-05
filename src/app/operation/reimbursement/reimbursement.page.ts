import {Component, inject} from '@angular/core';
import {formatNumberToCash} from "../../core/directives/cash-format.directive";
import {OperationService} from "../../services/operation.service";
import {ActivatedRoute} from "@angular/router";
import {Operation} from "../../core/models/operation.model";
import {State} from "../../core/models/enumerations/state.enum";

@Component({
  selector: 'app-reimbursement',
  templateUrl: './reimbursement.page.html',
  styleUrls: ['./reimbursement.page.scss'],
})
export class ReimbursementPage {

  protected readonly formatNumberToCash = formatNumberToCash;

  #operationService: OperationService = inject(OperationService);
  #activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  operation: Operation | null = this.#operationService.getOperationSubjectValue();

  remaining: number = 0;

  backUrl: string = "operations";

  constructor() {
  }

  ionViewWillEnter() {
    this.getBackUrl();
    this.getOperation();
  }

  getOperation() {
    if (!this.operation) {
      const operationID = this.#activatedRoute.snapshot.paramMap.get("operationID");
      this.#operationService.getOneObservable(operationID).subscribe(operation => {
        this.operation = operation;
        this.remaining = this.operation.remainingToReimburse ?? 0;
        this.#operationService.updateOperationSubject(operation);
      });
    } else {
      this.remaining = this.operation.remainingToReimburse ?? 0;
    }
  }

  reimbursementSaved($event: number) {
    this.remaining = this.remaining - $event;
    if (this.operation) {
      this.operation.remainingToReimburse = this.remaining;
      if (this.remaining === 0) {
        this.operation.state = State.PAID;
      }
    }
  }

  getBackUrl() {
    this.backUrl = 'operations';
    const backUrlParam = this.#activatedRoute.snapshot.queryParamMap.get('backUrl');
    if (backUrlParam) {
      this.backUrl = decodeURIComponent(backUrlParam);
    }
  }

}
