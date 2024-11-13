import {Component, inject, OnInit} from '@angular/core';
import {OperationService} from "../../../services/operation.service";
import {GetAllPage} from "../../../shared/models/getAllPage.model";
import {Operation} from "../../../core/models/operation.model";
import {Pageable} from "../../../shared/models/pageable.model";

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss'],
})
export class ReminderComponent implements OnInit {

  #operationService: OperationService = inject(OperationService);

  operationsPage!: GetAllPage<Operation>;
  operations: Operation[] = [];

  disableScroll: boolean = false;
  showSpinner: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
    this.searchReminderOperations();
  }

  searchReminderOperations(pageable: Pageable = new Pageable()) {
    if (pageable.page === 0) {
      this.disableScroll = false;
      this.operations = [];
      this.showSpinner = true;
    }
    this.#operationService.searchReminderOperations(pageable).subscribe({
      next: data => {
        this.operations = data.pageable.pageNumber === 0 ? data.content : [...this.operations, ...data.content];
        this.operationsPage = data;
        this.disableScroll = this.operationsPage.last;
        this.showSpinner = false;
      }
    });
  }

  loadMore($event: any) {
    if (this.operationsPage?.last === false) {
      this.searchReminderOperations(new Pageable(++this.operationsPage.pageable.pageNumber));
    }
    setTimeout(() => {
      $event.target.complete();
    }, 1000);
  }

}
