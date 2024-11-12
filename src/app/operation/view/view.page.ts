import {Component, inject} from '@angular/core';
import {OperationService} from "../../services/operation.service";
import {ActivatedRoute} from "@angular/router";
import {Operation} from "../../core/models/operation.model";
import {formatNumberToCash} from "../../core/directives/cash-format.directive";
import {Status} from "../../core/models/enumerations/status.enum";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage {

  protected readonly formatNumberToCash = formatNumberToCash;
  protected readonly Status = Status;

  #operationService: OperationService = inject(OperationService);
  #activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  operation: Operation | null = this.#operationService.getOperationSubjectValue();

  constructor(private navController: NavController) {
  }

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

  redirectToUpdate() {
    this.navController.navigateRoot("/form/step-one-operation/" + this.operation?.operationID)
  }

}
