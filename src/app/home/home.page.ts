import {Component, inject, OnInit} from '@angular/core';
import {Operation} from "../core/models/operation.model";
import {OperationService} from "../services/operation.service";
import {Client} from "../core/models/client.model";
import {ClientService} from "../services/client.service";
import {NavController} from "@ionic/angular";
import {Pageable} from "../shared/models/pageable.model";
import {formatNumberToCash} from "../core/directives/cash-format.directive";

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
  clients: Client[] = [];

  constructor(private nav: NavController) {
  }

  ngOnInit() {
    this.loadTodayOperations();
    this.loadReminders();
    this.loadRecentClients();
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
        this.clients = data.content;
      }
    });
  }

  redirectTo(url: string) {
    this.nav.navigateRoot(url);
  }

  viewReminder(reminder: Operation) {
    this.#operationService.updateOperationSubject(reminder);
    this.nav.navigateRoot('/operations/view/' + reminder.operationID);
  }
}
