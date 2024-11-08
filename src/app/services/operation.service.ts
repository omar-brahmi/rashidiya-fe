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

  getAllByFilter(pageable: Pageable = new Pageable(), cardNumber: string = "", phoneNumber: string = "",
                 startDate: string | null, endDate: string | null): Observable<GetAllPage<Operation>> {
    if (!startDate) {
      startDate = '';
    }
    return this.#httpService.get(this.entityName + '/search' + pageable.toQueryString() + `&cardNumber=${cardNumber}&phoneNumber=${phoneNumber}&startDate=${startDate}&endDate=${endDate}`);
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
