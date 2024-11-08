import {inject, Injectable} from '@angular/core';
import {BaseService} from "../shared/forms/generics/services/base.service";
import {Reimbursement} from "../core/models/Reimbursement.model";
import {HttpService} from "../shared/forms/generics/services/http.service";

@Injectable({
  providedIn: 'root'
})
export class ReimbursementService extends BaseService<Reimbursement> {

  protected override entityName = "reimbursement";

  #httpService: HttpService = inject(HttpService);

  constructor() {
    super()
  }

  save(reimbursement: Reimbursement, operationID: string | null) {
    return this.#httpService.post(this.entityName + '/create/' + operationID, reimbursement);
  }

}
