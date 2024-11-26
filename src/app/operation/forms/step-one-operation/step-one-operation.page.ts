import {Component, inject, OnInit} from '@angular/core';
import {OperationService} from "../../../services/operation.service";
import {Operation, OperationClass} from "../../../core/models/operation.model";
import {BasicComponent} from "../../../shared/forms/generics/forms/basic.component";
import {FormField} from "../../../shared/models/form-field.model";
import {unformatCash} from "../../../core/directives/cash-format.directive";
import {unformatWeight} from "../../../core/directives/weight-input.directive";
import {ToastService} from "../../../shared/services/toast.service";
import {ActivatedRoute} from "@angular/router";
import {ProcessImageState} from "../../../shared/utils/getPhoto";
import {NavController} from "@ionic/angular";
import {Client} from "../../../core/models/client.model";

@Component({
  selector: 'app-step-one-operation',
  templateUrl: './step-one-operation.page.html',
  styleUrls: ['./step-one-operation.page.scss'],
})
export class StepOneOperationPage extends BasicComponent<OperationClass, OperationService> implements OnInit {

  protected readonly ProcessImageState = ProcessImageState;

  #toastService: ToastService = inject(ToastService);
  #activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  protected formFields: FormField[] = [
    {
      fieldName: 'operationID',
      value: null,
    },
    {
      fieldName: 'operationNumber',
      value: null,
    },
    {
      fieldName: 'contract',
      value: null,
    },
    {
      fieldName: 'karat',
      value: null,
    },
    {
      fieldName: 'weight',
      value: null,
    },
    {
      fieldName: 'cash',
      value: null,
    },
    {
      fieldName: 'flag',
      value: true,
    },
    {
      fieldName: 'description',
      value: null,
    },
    {
      fieldName: 'client',
      value: null,
    }
  ];

  operation: Operation | null = this.operationService.getOperationSubjectValue();
  isUpdate: boolean = false;
  isLoading: boolean = false;

  constructor(private operationService: OperationService, private navController: NavController) {
    super(operationService);
  }

  ngOnInit() {
    this.buildForm();
  }

  ionViewWillEnter() {
    this.getOperation();
  }

  getOperation() {
    const operationID = this.#activatedRoute.snapshot.paramMap.get("operationID");
    if (operationID !== null) {
      if (!this.operation) {
        this.operationService.getOneObservable(operationID).subscribe(operation => {
          this.operation = operation;
          this.patchValuesForm();
        })
      } else {
        this.patchValuesForm();
      }
    }
  }

  patchValuesForm() {
    if (this.operation) {
      this.isUpdate = true;
      this.form.patchValue(this.operation);
    }
  }

  save() {
    this.isLoading = true;
    this.populatedObject().then(entity => {
      this.entity = entity;
      this.create().then(value => {
        if (this.isUpdate) {
          this.#toastService.success("Operation updated successfully.");
          this.operationService.updateOperationSubject(value);
          this.navController.navigateRoot("/operations/view/" + value.operationID);
        } else {
          this.#toastService.success("Operation saved successfully.");
          this.navController.navigateRoot("/operations");
        }
        this.isLoading = false;
      }).catch(error => {
        this.isLoading = false;
        if (this.isUpdate) {
          this.#toastService.error("Error updating operation");
        } else {
          this.#toastService.error("Error saving operation");
        }
      });
    });
  }

  populatedObject(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const entity: OperationClass = this.createObject();
        entity.weight = unformatWeight(entity.weight);
        entity.cash = unformatCash(entity.cash);
        entity.flag = entity.flag !== null;
        resolve(entity);
      } catch (error) {
        reject(error);
      }
    });
  }

  handleContractScanned($event: { contract: string }) {
    this.form.get('contract')?.setValue($event.contract);
  }

  selectedClient($event: Client) {
    this.form.get('client')?.setValue($event);
  }
}
