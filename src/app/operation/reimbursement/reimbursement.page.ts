import {Component, OnInit} from '@angular/core';
import {IonicSlides} from "@ionic/angular";

@Component({
  selector: 'app-reimbursement',
  templateUrl: './reimbursement.page.html',
  styleUrls: ['./reimbursement.page.scss'],
})
export class ReimbursementPage implements OnInit {

  swiperModules = [IonicSlides];

  phoneNumbers: any = ["+12345678", "+12345678", "+12345678", "+12345678", "+12345678", "+12345678"];

  constructor() {
  }

  ngOnInit() {
  }
}
