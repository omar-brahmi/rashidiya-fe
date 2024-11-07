import {Component, OnInit, ViewChild} from '@angular/core';
import {IonModal} from "@ionic/angular";

@Component({
  selector: 'app-list-reimbursement',
  templateUrl: './list-reimbursement.component.html',
  styleUrls: ['./list-reimbursement.component.scss'],
})
export class ListReimbursementComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  @ViewChild('reimbursementModal') reimbursementModal!: IonModal;

  capital: number = 0;
  interest: number = 0;

  openReimbursementModal() {
    this.reimbursementModal.present();
  }

  closeReimbursementModal() {
    this.reimbursementModal.dismiss();
  }

  submitReimbursement() {
    console.log('Capital:', this.capital);
    console.log('Interest:', this.interest);
    // Add your logic to save the reimbursement here

    this.closeReimbursementModal();
  }


}
