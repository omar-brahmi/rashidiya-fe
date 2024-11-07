import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {OperationService} from "../../../services/operation.service";
import {OperationClass} from "../../../core/models/operation.model";
import {BasicComponent} from "../../../shared/forms/generics/forms/basic.component";
import {FormField} from "../../../shared/models/form-field.model";
import {unformatCash} from "../../../core/directives/cash-format.directive";
import {unformatWeight} from "../../../core/directives/weight-input.directive";
import {PhoneNumbersComponent} from "./components/phone-numbers/phone-numbers.component";
import {ClientService} from "../../../services/client.service";
import {ToastService} from "../../../shared/services/toast.service";

@Component({
  selector: 'app-step-one-operation',
  templateUrl: './step-one-operation.page.html',
  styleUrls: ['./step-one-operation.page.scss'],
})
export class StepOneOperationPage extends BasicComponent<OperationClass, OperationService> implements OnInit {

  @ViewChild(PhoneNumbersComponent) phoneNumbersComponent!: PhoneNumbersComponent;

  #clientService: ClientService = inject(ClientService);
  #toastService: ToastService = inject(ToastService);

  protected formFields: FormField[] = [
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
      value: false,
    },
    {
      fieldName: 'description',
      value: null,
    }
  ];

  constructor(private operationService: OperationService) {
    super(operationService);
  }

  ngOnInit() {
    this.buildForm();
  }

  save() {
    this.populatedObject().then(entity => {
      this.entity = entity;
      console.log(this.entity);
    });
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

  handleCardScanned(event: {
    imageUrl: string,
    cardNumber: string | null,
    firstName: string | null,
    lastName: string | null
  }) {
    this.form.get('card')?.setValue(event.imageUrl);
    this.form.get('idCard')?.setValue(event.cardNumber);
    this.form.get('operationFirstName')?.setValue(event.firstName);
    this.form.get('operationLastName')?.setValue(event.lastName);
    if (event.cardNumber) {
      this.checkIfNewCustomer(event.cardNumber);
    }
  }

  handleContractScanned($event: { contract: string }) {
    this.form.get('contract')?.setValue($event.contract);
  }

  getPhoneNumbers() {
    return this.phoneNumbersComponent.phoneNumbers;
  }

  checkIfNewCustomer(cardNumber: string) {
    this.#clientService.getClientByIdCardAndPhoneNumbers(cardNumber, []).subscribe({
      next: data => {
        if (data) {
          this.form.get('operationFirstName')?.setValue(data.firstname);
          this.form.get('operationLastName')?.setValue(data.lastname);
          this.form.get('flag')?.setValue(data.newClient);
        }
      }
    });
  }

}
