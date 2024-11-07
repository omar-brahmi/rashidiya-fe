import {Status} from "./enumerations/status.enum";
import {State} from "./enumerations/state.enum";
import {Reimbursement} from "./Reimbursement.model";
import {PhoneNumber} from "./phoneNumber.model";

export interface Operation {
  operationID?: number;
  operationNumber?: string;
  operationFirstName?: string;
  operationLastName?: string;
  karat: string | null;
  weight?: number;
  cash?: number;
  contract?: string;
  card?: string;
  description?: string;
  status?: Status;
  state?: State;
  idParent?: number;
  idCard?: string;
  reimbursementsDTOs?: Reimbursement[];
  phoneNumbers?: PhoneNumber[];
  flag: boolean;
  createdAt?: Date;
  countReimbursements?: number;
  remainingToReimburse?:number;
}

export class OperationClass implements Operation {
  operationID?: number;
  operationNumber?: string;
  operationFirstName?: string;
  operationLastName?: string;
  karat: string | null = null;
  weight?: number;
  cash?: number;
  contract?: string;
  card?: string;
  description?: string;
  status?: Status;
  state?: State;
  idParent?: number;
  idCard?: string;
  reimbursementsDTOs?: Reimbursement[];
  phoneNumbers?: PhoneNumber[];
  flag: boolean = false;
  createdAt?: Date;
  countReimbursements?: number;

  constructor(
    operationID?: number,
    operationNumber?: string,
    operationFirstName?: string,
    operationLastName?: string,
    karat?: string | null,
    weight?: number,
    cash?: number,
    contract?: string,
    card?: string,
    description?: string,
    status?: Status,
    state?: State,
    idParent?: number,
    idCard?: string,
    reimbursementsDTOs?: Reimbursement[],
    phoneNumbers?: PhoneNumber[],
    flag?: boolean,
    createdAt?: Date,
    countReimbursements?: number
  ) {
    this.operationID = operationID;
    this.operationNumber = operationNumber;
    this.operationFirstName = operationFirstName;
    this.operationLastName = operationLastName;
    if (karat) {
      this.karat = karat;
    }
    this.weight = weight;
    this.cash = cash;
    this.contract = contract;
    this.card = card;
    this.description = description;
    this.status = status;
    this.state = state;
    this.idParent = idParent;
    this.idCard = idCard;
    this.reimbursementsDTOs = reimbursementsDTOs;
    this.phoneNumbers = phoneNumbers;
    if (flag) {
      this.flag = flag;
    }
    this.createdAt = createdAt;
    this.countReimbursements = countReimbursements;
  }
}
