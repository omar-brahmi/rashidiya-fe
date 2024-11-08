import {Component, inject, OnInit} from '@angular/core';
import {OperationService} from "../../services/operation.service";
import {ActivatedRoute} from "@angular/router";
import {Operation} from "../../core/models/operation.model";
import {formatNumberToCash} from "../../core/directives/cash-format.directive";
import {ProcessImageState} from "../../shared/utils/getPhoto";

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

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
      })
    }
  }

  protected readonly ProcessImageState = ProcessImageState;
}
