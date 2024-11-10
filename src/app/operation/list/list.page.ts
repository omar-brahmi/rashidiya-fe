import {Component, HostListener, inject, OnInit} from '@angular/core';
import {OperationService} from "../../services/operation.service";
import {Operation} from "../../core/models/operation.model";
import {GetAllPage} from "../../shared/models/getAllPage.model";
import {Pageable} from "../../shared/models/pageable.model";

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  #operationService: OperationService = inject(OperationService);

  operationsPage!: GetAllPage<Operation>;
  operations: Operation[] = [];

  disableScroll: boolean = false;
  flippedCardIndex: number | null = null;

  filter: { cardID: string; phoneNumbers: string } = {
    cardID: "",
    phoneNumbers: ""
  };

  constructor() {
  }

  ngOnInit(): void {
    this.loadAllOperationsByFilter();
  }

  loadAllOperationsByFilter(pageable: Pageable = new Pageable()) {
    if (pageable.page === 0) {
      this.disableScroll = false;
      this.operations = [];
    }
    this.#operationService.getAllByFilter(this.filter, pageable).subscribe({
      next: data => {
        this.operations = data.pageable.pageNumber === 0 ? data.content : [...this.operations, ...data.content];
        this.operationsPage = data;
        this.disableScroll = this.operationsPage.last;
      }
    })
  }

  loadMore($event: any) {
    if (this.operationsPage?.last === false) {
      this.loadAllOperationsByFilter(new Pageable(++this.operationsPage.pageable.pageNumber));
    }
    setTimeout(() => {
      $event.target.complete();
    }, 1000);
  }

  toggleCard(index: number) {
    if (this.flippedCardIndex != index) {
      this.flippedCardIndex = this.flippedCardIndex === index ? null : index;
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.three-d-card')) {
      this.flippedCardIndex = null;
    }
  }

  onFilterApplied($event: { cardID: string; phoneNumbers: string }) {
    this.filter = $event;
    this.loadAllOperationsByFilter();
  }

}
