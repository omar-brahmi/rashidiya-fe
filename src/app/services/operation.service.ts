import {inject, Injectable} from '@angular/core';
import {Operation, OperationClass} from "../core/models/operation.model";
import {BaseService} from "../shared/forms/generics/services/base.service";
import {HttpService} from "../shared/forms/generics/services/http.service";
import {GetAllPage} from "../shared/models/getAllPage.model";
import {BehaviorSubject, Observable} from "rxjs";
import {Pageable} from "../shared/models/pageable.model";

@Injectable({
  providedIn: 'root'
})
export class OperationService extends BaseService<Operation> {

  protected override entityName = "operation";

  #httpService: HttpService = inject(HttpService);

  private operationSubject: BehaviorSubject<OperationClass | null> = new BehaviorSubject<OperationClass | null>(null);

  constructor() {
    super();
  }

  getAllByFilter(filter: {
    cardID: string;
    phoneNumbers: string
  }, pageable: Pageable = new Pageable()): Observable<GetAllPage<Operation>> {
    return this.#httpService.get(this.entityName + '/search/validated' + pageable.toQueryString() + `&cardNumber=${filter.cardID}&phoneNumber=${filter.phoneNumbers}`);
  }

  getAllDraftByFilter(filter: {
    cardID: string;
    phoneNumbers: string
  }, pageable: Pageable = new Pageable()): Observable<any> {
    return this.#httpService.get(this.entityName + '/search/daily' + pageable.toQueryString() + `&cardNumber=${filter.cardID}&phoneNumber=${filter.phoneNumbers}`);
  }

  searchReminderOperations(pageable: Pageable = new Pageable(), date: string = new Date().toISOString().split('T')[0]): Observable<GetAllPage<Operation>> {
    return this.#httpService.get(this.entityName + '/reminder' + pageable.toQueryString() + '&LocalDateTime='+date);
  }

  findBalancePerDayOperations(operationDate: string = "", cardID: string = "", phoneNumber: string = ""): Observable<any> {
    return this.#httpService.get(this.entityName + `/balance/daily?operationDate=${operationDate}&idCard=${cardID}&phoneNumber=${phoneNumber}`);
  }

  validateOperation(operationID: number = 0) {
    return this.#httpService.patch<Operation, any>(this.entityName + `/validate/${operationID}`, {});
  }

  cancelOperation(operation: OperationClass) {
    return this.#httpService.patch<Operation, any>(this.entityName + `/cancel`, operation);
  }

  updateOperationSubject(operation: OperationClass): void {
    this.operationSubject.next(operation);
  }

  getOperationSubjectValue(): OperationClass | null {
    return this.operationSubject.value;
  }

  destroyOperationSubject() {
    this.operationSubject.next(null);
  }

}
