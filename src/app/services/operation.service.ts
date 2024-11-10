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
    return this.#httpService.get(this.entityName + '/search' + pageable.toQueryString() + `&cardNumber=${filter.cardID}&phoneNumber=${filter.phoneNumbers}`);
  }

  getAllDraftByFilter(filter: {
    cardID: string;
    phoneNumbers: string
  }, pageable: Pageable = new Pageable()): Observable<any> {
    return this.#httpService.get(this.entityName + '/search/daily' + pageable.toQueryString() + `&cardNumber=${filter.cardID}&phoneNumber=${filter.phoneNumbers}`);
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
