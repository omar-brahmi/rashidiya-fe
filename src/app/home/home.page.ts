import {Component, inject, OnInit} from '@angular/core';
import {Operation} from "../core/models/operation.model";
import {OperationService} from "../services/operation.service";
import {Client} from "../core/models/client.model";
import {ClientService} from "../services/client.service";
import {NavController} from "@ionic/angular";
import {Pageable} from "../shared/models/pageable.model";
import {formatNumberToCash} from "../core/directives/cash-format.directive";
import {GetAllPage} from "../shared/models/getAllPage.model";
import {User} from "../core/models/user.model";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  protected readonly formatNumberToCash = formatNumberToCash;

  #operationService: OperationService = inject(OperationService);
  #clientService: ClientService = inject(ClientService);

  operations: Operation[] = [];
  reminders: Operation[] = [];
  clientPage!: GetAllPage<Client>
  clients: Client[] = [];
  today: Date = new Date();

  countOperation: number = 0;

  loggedUser: User | null = inject(AuthenticationService).getLoggedUser();

  constructor(private nav: NavController) {
  }

  ngOnInit() {
    this.loadTodayOperations();
    this.loadReminders();
    this.loadRecentClients();
    this.loadCountOperation();
  }

  loadTodayOperations() {
    this.#operationService.getAllDraftByFilter({
      cardID: "",
      phoneNumbers: ""
    }, new Pageable()).subscribe({
      next: data => {
        this.operations = data.content;
      }
    });
  }

  loadReminders() {
    this.#operationService.searchReminderOperations(new Pageable(0, 5)).subscribe({
      next: data => {
        this.reminders = data.content;
      }
    });
  }

  loadRecentClients() {
    this.#clientService.getAllByFilter({
      cardID: "",
      phoneNumbers: "",
      firstName: "",
      lastName: ""
    }, new Pageable()).subscribe({
      next: data => {
        this.clientPage = data;
        this.clients = data.content;
      }
    });
  }

  loadCountOperation() {
    this.#operationService.countOperations().subscribe({
      next: value => {
        this.countOperation = value;
      }
    })
  }

  redirectTo(url: string) {
    this.nav.navigateRoot(url);
  }

  redirectToUserProfile() {
    this.redirectTo('user-profile');
  }

}
