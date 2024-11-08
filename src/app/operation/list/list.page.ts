import {Component, HostListener, inject, OnInit, ViewChild} from '@angular/core';
import {OperationService} from "../../services/operation.service";
import {Operation} from "../../core/models/operation.model";
import {GetAllPage} from "../../shared/models/getAllPage.model";
import {Pageable} from "../../shared/models/pageable.model";
import {IonInfiniteScroll} from "@ionic/angular";

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;

  #operationService: OperationService = inject(OperationService);

  operationsPage!: GetAllPage<Operation>;
  operations: Operation[] = [];

  flippedCardIndex: number | null = null;

  constructor() {
  }

  ngOnInit(): void {
    this.loadAllOperationsByFilter();
  }

  loadAllOperationsByFilter(pageable: Pageable = new Pageable()) {
    this.#operationService.getAllByFilter(pageable, "", "", "", "").subscribe({
      next: data => {
        if (data.pageable.pageNumber === 0) {
          this.operations = data.content;
        } else {
          this.operations = [...this.operations, ...data.content];
        }
        this.operationsPage = data;
        if (this.infiniteScroll) {
          this.infiniteScroll.disabled = this.operationsPage.last;
        }
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

}
