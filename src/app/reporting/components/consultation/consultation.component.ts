import {Component, inject, OnInit} from '@angular/core';
import {Status} from '../../../core/models/enumerations/status.enum';
import {formatNumberToCash} from "../../../core/directives/cash-format.directive";
import {Operation} from "../../../core/models/operation.model";
import {NavController} from "@ionic/angular";
import {OperationService} from "../../../services/operation.service";
import {GetAllPage} from "../../../shared/models/getAllPage.model";
import {Pageable} from "../../../shared/models/pageable.model";

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss'],
})
export class ConsultationComponent implements OnInit {

  protected readonly formatNumberToCash = formatNumberToCash;
  protected readonly Status = Status;

  #operationService: OperationService = inject(OperationService);
  #router: NavController = inject(NavController)

  operationsPage!: GetAllPage<Operation>;
  operations: Operation[] = [];

  disableScroll: boolean = false;
  showSpinner: boolean = true;

  searchForm = {
    createdAt: '',
    phoneNumbers: '',
    idCard: '',
    cash: '',
    status: '',
    operationFirstName: '',
    operationLastName: ''
  };

  ngOnInit(): void {
    this.#operationService.destroyOperationSubject();
    this.loadAllOperationsByFilter();
  }

  loadAllOperationsByFilter(pageable: Pageable = new Pageable()) {
    if (pageable.page === 0) {
      this.disableScroll = false;
      this.operations = [];
      this.showSpinner = true;
    }
    this.#operationService.findAll(this.searchForm, pageable).subscribe({
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
      this.loadAllOperationsByFilter(new Pageable(++this.operationsPage.pageable.pageNumber));
    }
    setTimeout(() => {
      $event.target.complete();
    }, 1000);
  }

  redirectToView(operation: Operation) {
    this.#operationService.updateOperationSubject(operation);
    this.#router.navigateRoot("/view-operation/" + operation.operationID)
  }

  filterApplied($event: {
    createdAt: string;
    phoneNumbers: string;
    idCard: string;
    cash: string;
    status: string;
    operationFirstName: string;
    operationLastName: string
  }) {
    this.searchForm = $event;
    this.loadAllOperationsByFilter();
  }

}
