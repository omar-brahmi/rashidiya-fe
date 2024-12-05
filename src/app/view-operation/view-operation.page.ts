import {Component, inject} from '@angular/core';
import {Operation} from '../core/models/operation.model';
import {Status} from '../core/models/enumerations/status.enum';
import {formatNumberToCash} from '../core/directives/cash-format.directive';
import {OperationService} from "../services/operation.service";
import {ActivatedRoute} from "@angular/router";
import {State} from "../core/models/enumerations/state.enum";

@Component({
  selector: 'app-view-operation',
  templateUrl: './view-operation.page.html',
  styleUrls: ['./view-operation.page.scss'],
})
export class ViewOperationPage {

  protected readonly formatNumberToCash = formatNumberToCash;
  protected readonly Status = Status;
  protected readonly State = State;

  #operationService: OperationService = inject(OperationService);
  #activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  operation: Operation | null = this.#operationService.getOperationSubjectValue();

  ionViewWillEnter() {
    this.getOperation();
  }

  getOperation() {
    if (!this.operation) {
      const operationID = this.#activatedRoute.snapshot.paramMap.get("operationID");
      this.#operationService.getOneObservable(operationID).subscribe(operation => {
        this.operation = operation;
        this.#operationService.updateOperationSubject(operation);
      })
    }
  }

}
