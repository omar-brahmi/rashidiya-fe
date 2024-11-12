import {Component, Input, OnInit} from '@angular/core';
import {PhoneNumber} from "../../../../../core/models/phoneNumber.model";

@Component({
  selector: 'app-phone-numbers',
  templateUrl: './phone-numbers.component.html',
  styleUrls: ['./phone-numbers.component.scss'],
})
export class PhoneNumbersComponent implements OnInit {

  @Input({transform: (value: PhoneNumber[] | undefined): PhoneNumber[] => value ?? [new PhoneNumber()]}) phoneNumbers: PhoneNumber[] = [];

  constructor() {
  }

  ngOnInit(): void {
    if (this.phoneNumbers.length === 0) {
      this.addPhoneNumber();
    }
  }

  addPhoneNumber() {
    if (this.phoneNumbers.length < 5) {
      this.phoneNumbers.push(new PhoneNumber());
    }
  }


  removePhone(index: number) {
    this.phoneNumbers.splice(index, 1);
    if (this.phoneNumbers.length === 0) {
      this.addPhoneNumber();
    }
  }

}
