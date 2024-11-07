import {PhoneNumber} from "./phoneNumber.model";

export class Client {
  idCard?: string;
  firstname?: string;
  lastname?: string;
  newClient?: boolean;
  phoneNumberDTOs?: PhoneNumber[];
}
