import {Component, OnInit} from '@angular/core';
import {PhoneNumber} from "../../../../../core/models/phoneNumber.model";

@Component({
  selector: 'app-phone-numbers',
  templateUrl: './phone-numbers.component.html',
  styleUrls: ['./phone-numbers.component.scss'],
})
export class PhoneNumbersComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    if (this.phoneNumbers.length === 0) {
      this.addPhoneNumber();
    }
  }

  phoneNumbers: PhoneNumber[] = [];

  addPhoneNumber() {
    if (this.phoneNumbers.length < 5) {
      this.phoneNumbers.push(new PhoneNumber());
    }
  }


  removePhone(index: number) {
    if (this.phoneNumbers.length > 1) {
      this.phoneNumbers.splice(index, 1);
    }
  }

}
