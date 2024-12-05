import {Component} from '@angular/core';
import {Status} from '../../../core/models/enumerations/status.enum';
import {formatNumberToCash} from "../../../core/directives/cash-format.directive";
import {OperationClass} from "../../../core/models/operation.model";
import {State} from "../../../core/models/enumerations/state.enum";

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss'],
})
export class ConsultationComponent {

  operations: OperationClass[] = [
    {
      operationNumber: 'OP-001',
      createdAt: new Date('2024-01-15'),
      operationFirstName: 'John',
      operationLastName: 'Doe',
      phoneNumbers: [{number: '+1234567890'}],
      karat: '18K',
      cash: 15000,
      status: Status.DRAFT,
      state: State.NEW,
      idCard: '123-4567-8901234-5',
      flag: false
    },
    {
      operationNumber: 'OP-002',
      createdAt: new Date('2024-01-16'),
      operationFirstName: 'Jane',
      operationLastName: 'Smith',
      phoneNumbers: [{number: '+9876543210'}],
      karat: '22K',
      cash: 25000,
      status: Status.VALIDATED,
      state: State.PARTIALLY_PAID,
      idCard: '987-6543-2109876-5',
      flag: false
    },
    {
      operationNumber: 'OP-003',
      createdAt: new Date('2024-01-17'),
      operationFirstName: 'Mike',
      operationLastName: 'Johnson',
      phoneNumbers: [{number: '+1122334455'}],
      karat: '21K',
      cash: 35000,
      status: Status.VALIDATED,
      state: State.PAID,
      flag: false
    },
    {
      operationNumber: 'OP-004',
      createdAt: new Date('2024-01-17'),
      operationFirstName: 'Mike',
      operationLastName: 'Johnson',
      phoneNumbers: [{number: '+1122334455'}],
      karat: '21K',
      cash: 35000,
      status: Status.VALIDATED,
      state: State.CANCELLED,
      flag: false
    }
  ];

  protected readonly Status = Status;
  protected readonly formatNumberToCash = formatNumberToCash;
}
