import {inject, Injectable} from '@angular/core';
import {Operation} from "../core/models/operation.model";
import {BaseService} from "../shared/forms/generics/services/base.service";
import {HttpService} from "../shared/forms/generics/services/http.service";

@Injectable({
  providedIn: 'root'
})
export class OperationService extends BaseService<Operation> {

  protected override entityName = "operation";

  #httpService: HttpService = inject(HttpService);

  constructor() {
    super();
  }


}
