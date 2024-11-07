import {Component, OnInit} from '@angular/core';
import {OperationService} from "../../../services/operation.service";
import {OperationClass} from "../../../core/models/operation.model";
import {BasicComponent} from "../../../shared/forms/generics/forms/basic.component";
import {FormField} from "../../../shared/models/form-field.model";

@Component({
  selector: 'app-step-one-operation',
  templateUrl: './step-one-operation.page.html',
  styleUrls: ['./step-one-operation.page.scss'],
})
export class StepOneOperationPage extends BasicComponent<OperationClass, OperationService> implements OnInit {

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
    }
  ];

  constructor(private operationService: OperationService) {
    super(operationService);
  }

  ngOnInit() {
    this.buildForm();
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
  }

}
