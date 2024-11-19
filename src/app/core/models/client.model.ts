import {PhoneNumber} from "./phoneNumber.model";

export class Client {
  card?: string;
  idCard?: string;
  firstname?: string;
  lastname?: string;
  newClient?: boolean;
  phoneNumberDTOs?: PhoneNumber[];
}
