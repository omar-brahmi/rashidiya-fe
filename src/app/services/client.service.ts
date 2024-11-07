import {inject, Injectable} from '@angular/core';
import {BaseService} from "../shared/forms/generics/services/base.service";
import {Client} from "../core/models/client.model";
import {HttpService} from "../shared/forms/generics/services/http.service";
import {PhoneNumber} from "../core/models/phoneNumber.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientService extends BaseService<Client> {

  protected override entityName = "client";

  #httpService: HttpService = inject(HttpService);

  constructor() {
    super()
  }

  getClientByIdCardAndPhoneNumbers(idCard: string, phoneNumbers: PhoneNumber[]): Observable<Client> {
    const phoneNumbersParam = phoneNumbers.map(phone => phone.number).join(',');
    const url = `${this.entityName}/${idCard}?phoneNumbers=${encodeURIComponent(phoneNumbersParam)}`;
    return this.#httpService.get<Client>(url);
  }

}
