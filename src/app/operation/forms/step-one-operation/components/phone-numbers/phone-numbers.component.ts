import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-phone-numbers',
  templateUrl: './phone-numbers.component.html',
  styleUrls: ['./phone-numbers.component.scss'],
})
export class PhoneNumbersComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  phoneNumbers = [{ value: '' }];// Start with one phone number field

  addPhoneNumber() {
    if (this.phoneNumbers.length < 5) {
      this.phoneNumbers.push({ value: '' });
    }
  }


  removePhone(index: number) {
    if (this.phoneNumbers.length > 1) {
      this.phoneNumbers.splice(index, 1); // Remove the selected phone number
    }
  }

}
