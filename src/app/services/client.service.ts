import {inject, Injectable} from '@angular/core';
import {BaseService} from "../shared/forms/generics/services/base.service";
import {Client} from "../core/models/client.model";
import {HttpService} from "../shared/forms/generics/services/http.service";
import {PhoneNumber} from "../core/models/phoneNumber.model";
import {Observable} from "rxjs";
import {Pageable} from "../shared/models/pageable.model";
import {GetAllPage} from "../shared/models/getAllPage.model";

@Injectable({
  providedIn: 'root'
})
export class ClientService extends BaseService<Client> {

  protected override entityName = "client";

  #httpService: HttpService = inject(HttpService);

  constructor() {
    super()
  }

  getAllByFilter(filter: {
    idCard: string;
    phoneNumber: string,
    firstName: string,
    lastName: string
  }, pageable: Pageable = new Pageable()): Observable<GetAllPage<Client>> {
    return this.#httpService.get(this.entityName + '/searchAllByCriteria' + pageable.toQueryString() + `&idCard=${filter.idCard}&phoneNumber=${filter.phoneNumber}&firstName=${filter.firstName}&lastName=${filter.lastName}`);
  }

  getClientByIdCardAndPhoneNumbers(idCard: string, phoneNumbers: PhoneNumber[]): Observable<Client> {
    const phoneNumbersParam = phoneNumbers.map(phone => phone.number).join(',');
    const url = `${this.entityName}/${idCard}?phoneNumbers=${encodeURIComponent(phoneNumbersParam)}`;
    return this.#httpService.get<Client>(url);
  }

}
