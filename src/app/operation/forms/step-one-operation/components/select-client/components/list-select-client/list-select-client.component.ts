import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {ClientService} from "../../../../../../../services/client.service";
import {GetAllPage} from "../../../../../../../shared/models/getAllPage.model";
import {Client} from "../../../../../../../core/models/client.model";
import {NavController} from "@ionic/angular";
import {Pageable} from "../../../../../../../shared/models/pageable.model";

@Component({
  selector: 'app-list-select-client',
  templateUrl: './list-select-client.component.html',
  styleUrls: ['./list-select-client.component.scss'],
})
export class ListSelectClientComponent implements OnInit {

  @Output() handleSelectedClient = new EventEmitter<Client>();
  @Output() handlecloseModal = new EventEmitter<boolean>();

  #clientService: ClientService = inject(ClientService);

  clientPage!: GetAllPage<Client>;
  clients: Client[] = [];

  disableScroll: boolean = false;

  filter: { cardID: string; phoneNumbers: string; firstName: string; lastName: string; } = {
    cardID: "",
    phoneNumbers: "",
    firstName: "",
    lastName: ""
  };

  showSpinner: boolean = true;

  constructor(private nav: NavController) {
  }

  ngOnInit() {
    this.loadAllClientByFilter();
  }

  loadAllClientByFilter(pageable: Pageable = new Pageable()) {
    if (pageable.page === 0) {
      this.disableScroll = false;
      this.clients = [];
      this.showSpinner = true;
    }
    this.#clientService.getAllByFilter(this.filter, pageable).subscribe({
      next: data => {
        this.clients = data.pageable.pageNumber === 0 ? data.content : [...this.clients, ...data.content];
        this.clientPage = data;
        this.disableScroll = this.clientPage.last;
        this.showSpinner = false;
      }
    });
  }

  loadMore($event: any) {
    if (this.clientPage?.last === false) {
      this.loadAllClientByFilter(new Pageable(++this.clientPage.pageable.pageNumber));
    }
    setTimeout(() => {
      $event.target.complete();
    }, 1000);
  }

  handleFilterApplied($event: { cardID: string; phoneNumbers: string; firstName: string; lastName: string }) {
    this.filter = $event;
    this.loadAllClientByFilter();
  }

  selectedClient(client: Client) {
    this.handleSelectedClient.emit(client);
  }

}
