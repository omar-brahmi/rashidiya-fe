import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {OperationService} from "../../services/operation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Operation, OperationClass} from "../../core/models/operation.model";
import {formatNumberToCash, unformatCash} from "../../core/directives/cash-format.directive";
import {BasicComponent} from "../../shared/forms/generics/forms/basic.component";
import {FormField} from "../../shared/models/form-field.model";
import {unformatWeight} from "../../core/directives/weight-input.directive";
import {PhoneNumbersComponent} from "../forms/step-one-operation/components/phone-numbers/phone-numbers.component";
import {ToastService} from "../../shared/services/toast.service";

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.page.html',
  styleUrls: ['./cancel.page.scss'],
})
export class CancelPage extends BasicComponent<OperationClass, OperationService> implements OnInit {

  @ViewChild(PhoneNumbersComponent) phoneNumbersComponent!: PhoneNumbersComponent;

  protected readonly formatNumberToCash = formatNumberToCash;

  protected formFields: FormField[] = [
    {
      fieldName: 'operationID',
      value: null,
    },
    {
      fieldName: 'operationFirstName',
      value: null,
    },
    {
      fieldName: 'operationLastName',
      value: null,
    },
    {
      fieldName: 'contract',
      value: null,
    },
    {
      fieldName: 'card',
      value: null,
    },
    {
      fieldName: 'idCard',
      value: null,
    },
    {
      fieldName: 'phoneNumbers',
      value: [],
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
    }
  ];

  #operationService: OperationService = inject(OperationService);
  #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  #toastService: ToastService = inject(ToastService);
  #router: Router = inject(Router);

  operation: Operation | null = this.#operationService.getOperationSubjectValue();

  constructor(private operationService: OperationService) {
    super(operationService);
  }

  ngOnInit(): void {
    this.buildForm().then(() => {
      this.getOperation();
      if (this.operation) {
        this.form.patchValue(this.operation);
      }
    });
  }

  cancelOperation() {
    this.populatedObject().then(entity => {
      this.entity = entity;
      this.operationService.cancelOperation(this.entity).subscribe({
        next: value => {
          this.#toastService.success("Operation Canceled successfully.");
          this.#router.navigate(['/operations']);
        }, error: err => {
          this.#toastService.error("Error Canceling operation !!!");
        }
      })
    });
  }

  getOperation() {
    if (!this.operation) {
      const operationID = this.#activatedRoute.snapshot.paramMap.get("operationID");
      this.#operationService.getOneObservable(operationID).subscribe(operation => {
        this.operation = operation;
        this.form.patchValue(operation);
      })
    }
  }

  populatedObject(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const entity: OperationClass = this.createObject();
        entity.weight = unformatWeight(entity.weight);
        entity.cash = unformatCash(entity.cash);
        entity.phoneNumbers = this.getPhoneNumbers();
        resolve(entity);
      } catch (error) {
        reject(error);
      }
    });
  }

  getPhoneNumbers() {
    return this.phoneNumbersComponent.phoneNumbers;
  }

}