import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Client} from "../../../../../core/models/client.model";
import {IonModal} from "@ionic/angular";

@Component({
  selector: 'app-modal-client',
  templateUrl: './modal-client.component.html',
  styleUrls: ['./modal-client.component.scss'],
})
export class ModalClientComponent implements OnInit {

  @Output() handleSelectedClient: EventEmitter<Client> = new EventEmitter<Client>();

  presentingElement: any = null;

  clients: Client[] = [
    {
      idCard: 'C12345',
      firstname: 'Connor',
      lastname: 'Smith',
      phoneNumberDTOs: [
        {number: '+123456789'},
        {number: '+234567890'},
        {number: '+345678901'}
      ]
    },
    {
      idCard: 'C67890',
      firstname: 'Daniel',
      lastname: 'Smith',
      phoneNumberDTOs: [
        {number: '+987654321'},
        {number: '+876543210'},
        {number: '+765432109'},
        {number: '+654321098'},
        {number: '+543210987'},
        {number: '+432109876'} // Won't be displayed (max 5)
      ]
    },
    {
      idCard: 'C11223',
      firstname: 'Greg',
      lastname: 'Smith',
      phoneNumberDTOs: [{number: '+567890123'}]
    },
    {
      idCard: 'C44556',
      firstname: 'Zoey',
      lastname: 'Smith',
      phoneNumberDTOs: [
        {number: '+456789012'},
        {number: '+123456789'}
      ]
    },
    {
      idCard: 'C44556',
      firstname: 'Zoey',
      lastname: 'Smith',
      phoneNumberDTOs: [
        {number: '+456789012'},
        {number: '+123456789'}
      ]
    },
    {
      idCard: 'C44556',
      firstname: 'Zoey',
      lastname: 'Smith',
      phoneNumberDTOs: [
        {number: '+456789012'},
        {number: '+123456789'}
      ]
    },
    {
      idCard: 'C44556',
      firstname: 'Zoey',
      lastname: 'Smith',
      phoneNumberDTOs: [
        {number: '+456789012'},
        {number: '+123456789'}
      ]
    },
    {
      idCard: 'C44556',
      firstname: 'Zoey',
      lastname: 'Smith',
      phoneNumberDTOs: [
        {number: '+456789012'},
        {number: '+123456789'}
      ]
    },
  ];

  constructor() {
  }

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
  }

  selectedClient(client: Client, modal: IonModal) {
    this.handleSelectedClient.emit(client);
    modal.dismiss();
  }

}
