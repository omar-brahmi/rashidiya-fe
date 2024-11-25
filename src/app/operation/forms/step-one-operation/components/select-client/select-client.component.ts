import {Component, EventEmitter, Output} from '@angular/core';
import {Client} from "../../../../../core/models/client.model";

@Component({
  selector: 'app-select-client',
  templateUrl: './select-client.component.html',
  styleUrls: ['./select-client.component.scss'],
})
export class SelectClientComponent {

  @Output() handleSelectedClient = new EventEmitter<Client>();

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  selectedClient($event: Client) {
    this.handleSelectedClient.emit($event);
    this.setOpen(false);
  }

}
