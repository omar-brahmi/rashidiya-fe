import {Component, inject, OnInit} from '@angular/core';
import {formatNumberToCash} from "../../core/directives/cash-format.directive";
import {OperationService} from "../../services/operation.service";
import {ActivatedRoute} from "@angular/router";
import {Operation} from "../../core/models/operation.model";

@Component({
  selector: 'app-reimbursement',
  templateUrl: './reimbursement.page.html',
  styleUrls: ['./reimbursement.page.scss'],
})
export class ReimbursementPage implements OnInit {

  protected readonly formatNumberToCash = formatNumberToCash;

  #operationService: OperationService = inject(OperationService);
  #activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  operation: Operation | null = this.#operationService.getOperationSubjectValue();

  constructor() {
  }

  ngOnInit() {
    this.getOperation();
  }

  getOperation() {
    if (!this.operation) {
      const operationID = this.#activatedRoute.snapshot.paramMap.get("operationID");
      this.#operationService.getOneObservable(operationID).subscribe(operation => {
        this.operation = operation;
        this.#operationService.updateOperationSubject(operation);
      });
    }
  }

}
