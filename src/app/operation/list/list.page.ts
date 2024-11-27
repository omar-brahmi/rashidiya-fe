import {Component, HostListener, inject} from '@angular/core';
import {OperationService} from "../../services/operation.service";
import {Operation} from "../../core/models/operation.model";
import {GetAllPage} from "../../shared/models/getAllPage.model";
import {Pageable} from "../../shared/models/pageable.model";
import {ActivatedRoute, Router} from "@angular/router";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage {

  #operationService: OperationService = inject(OperationService);
  #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  #router: Router = inject(Router);

  operationsPage!: GetAllPage<Operation>;
  operations: Operation[] = [];

  selectedSegment: string = 'all';

  disableScroll: boolean = false;
  flippedCardIndex: number | null = null;

  filter: { cardID: string; phoneNumbers: string } = {
    cardID: "",
    phoneNumbers: ""
  };

  showSpinner: boolean = true;

  constructor(private nav: NavController) {
  }

  ionViewWillEnter() {
    this.getSegmentParam();
    this.loadAllOperationsByFilter();
  }

  loadAllOperationsByFilter(pageable: Pageable = new Pageable()) {
    if (pageable.page === 0) {
      this.disableScroll = false;
      this.operations = [];
      this.showSpinner = true;
    }
    if (this.selectedSegment === 'all') {
      this.#operationService.getAllByFilter(this.filter, pageable).subscribe({
        next: data => {
          this.operations = data.pageable.pageNumber === 0 ? data.content : [...this.operations, ...data.content];
          this.operationsPage = data;
          this.disableScroll = this.operationsPage.last;
          this.showSpinner = false;
        }
      });
    } else {
      this.#operationService.getAllDraftByFilter(this.filter, pageable).subscribe({
        next: data => {
          this.operations = data.pageable.pageNumber === 0 ? data.content : [...this.operations, ...data.content];
          this.operationsPage = data;
          this.disableScroll = this.operationsPage.last;
          this.showSpinner = false;
        }
      });
    }
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
    if (this.selectedSegment === "all") {
      if (this.flippedCardIndex != index) {
        this.flippedCardIndex = this.flippedCardIndex === index ? null : index;
      }
    } else {
      this.#operationService.updateOperationSubject(this.operations[index]);
      this.#router.navigate(['/operations/view/' + this.operations[index].operationID]);
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

  onSegmentChange($event: any) {
    this.selectedSegment = $event.detail.value;
    this.loadAllOperationsByFilter();
  }

  redirectToNewOperation() {
    this.#operationService.destroyOperationSubject();
    this.nav.navigateRoot("/form/step-one-operation");
  }

  getSegmentParam() {
    this.selectedSegment = 'all';
    const dayParam = this.#activatedRoute.snapshot.queryParamMap.get('day');
    if (dayParam == "true") {
      this.selectedSegment = 'day';
    }
  }

}
