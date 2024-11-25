import {Component, inject} from '@angular/core';
import {NavController} from "@ionic/angular";
import {ClientService} from "../../services/client.service";
import {GetAllPage} from "../../shared/models/getAllPage.model";
import {Client} from "../../core/models/client.model";
import {Pageable} from "../../shared/models/pageable.model";

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.page.html',
  styleUrls: ['./list-client.page.scss'],
})
export class ListClientPage {

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

  ionViewWillEnter() {
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

  redirectToNewClient() {
    this.nav.navigateRoot("/form-client");
  }

  handleFilterApplied($event: { cardID: string; phoneNumbers: string; firstName: string; lastName: string }) {
    this.filter = $event;
    this.loadAllClientByFilter();
  }
}
