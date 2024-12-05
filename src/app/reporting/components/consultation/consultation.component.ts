import {Component, inject, OnInit} from '@angular/core';
import {Status} from '../../../core/models/enumerations/status.enum';
import {formatNumberToCash} from "../../../core/directives/cash-format.directive";
import {Operation, OperationClass} from "../../../core/models/operation.model";
import {State} from "../../../core/models/enumerations/state.enum";
import {NavController} from "@ionic/angular";
import {OperationService} from "../../../services/operation.service";

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss'],
})
export class ConsultationComponent implements OnInit {

  protected readonly formatNumberToCash = formatNumberToCash;
  protected readonly Status = Status;

  #operationService: OperationService = inject(OperationService);
  #router: NavController = inject(NavController)

  operations: OperationClass[] = [
    {
      operationID: 1,
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
      operationID: 2,
      operationNumber: 'OP-011',
      createdAt: new Date('2024-01-15'),
      operationFirstName: 'John',
      operationLastName: 'Doe',
      phoneNumbers: [{number: '+1234567890'}],
      karat: '18K',
      cash: 15000,
      status: Status.VALIDATED,
      state: State.NEW,
      idCard: '123-4567-8901234-5',
      flag: false
    },
    {
      operationID: 1,
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
      operationID: 1,
      operationNumber: 'OP-003',
      createdAt: new Date('2024-01-17'),
      operationFirstName: 'Mike',
      operationLastName: 'Johnson',
      phoneNumbers: [{number: '+1122334455'}],
      karat: '21K',
      cash: 35000,
      status: Status.VALIDATED,
      state: State.PAID,
      idCard: '987-6543-2109876-5',
      flag: false
    },
    {
      operationID: 1,
      operationNumber: 'OP-004',
      createdAt: new Date('2024-01-17'),
      operationFirstName: 'Mike',
      operationLastName: 'Johnson',
      phoneNumbers: [{number: '+1122334455'}],
      karat: '21K',
      cash: 35000,
      status: Status.VALIDATED,
      state: State.CANCELLED,
      idCard: '987-6543-2109876-5',
      flag: false
    }
  ];

  ngOnInit(): void {
    this.#operationService.destroyOperationSubject();
  }

  redirectToView(operation: Operation) {
    this.#operationService.updateOperationSubject(operation);
    this.#router.navigateRoot("/view-operation/" + operation.operationID)
  }

}
