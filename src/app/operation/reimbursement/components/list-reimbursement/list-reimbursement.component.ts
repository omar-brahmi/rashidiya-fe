import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {ReimbursementService} from "../../../../services/reimbursement.service";
import {ActivatedRoute} from "@angular/router";
import {Reimbursement} from "../../../../core/models/Reimbursement.model";
import {GetAllPage} from "../../../../shared/models/getAllPage.model";
import {Pageable} from "../../../../shared/models/pageable.model";
import {formatNumberToCash} from "../../../../core/directives/cash-format.directive";

@Component({
  selector: 'app-list-reimbursement',
  templateUrl: './list-reimbursement.component.html',
  styleUrls: ['./list-reimbursement.component.scss'],
})
export class ListReimbursementComponent implements OnInit {

  @Output() reimbursementSaved: EventEmitter<number> = new EventEmitter<number>();

  protected readonly formatNumberToCash = formatNumberToCash;

  #reimbursementService: ReimbursementService = inject(ReimbursementService);
  #activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  reimbursementsPage!: GetAllPage<Reimbursement>;
  reimbursements: Reimbursement[] = [];

  disableScroll: boolean = false;

  constructor() {
  }

  ngOnInit() {
    this.loadAllReimbursementByOperationsID();
  }

  loadAllReimbursementByOperationsID(pageable: Pageable = new Pageable()) {
    const operationID = this.#activatedRoute.snapshot.paramMap.get("operationID");
    if (pageable.page === 0) {
      this.disableScroll = false;
      this.reimbursements = [];
    }
    this.#reimbursementService.searchReimbursementByOperationsID(operationID, pageable).subscribe({
      next: data => {
        this.reimbursements = data.pageable.pageNumber === 0 ? data.content : [...this.reimbursements, ...data.content];
        this.reimbursementsPage = data;
        this.disableScroll = this.reimbursementsPage.last;
      }
    })
  }

  loadMore($event: any) {
    if (this.reimbursementsPage?.last === false) {
      this.loadAllReimbursementByOperationsID(new Pageable(++this.reimbursementsPage.pageable.pageNumber));
    }
    setTimeout(() => {
      $event.target.complete();
    }, 1000);
  }

  savedReimbursement($event: number) {
    this.reimbursementSaved.emit($event);
    this.loadAllReimbursementByOperationsID();
  }

}
