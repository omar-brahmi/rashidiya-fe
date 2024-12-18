import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {BasicComponent} from "../../../../../../shared/forms/generics/forms/basic.component";
import {Reimbursement} from "../../../../../../core/models/Reimbursement.model";
import {ReimbursementService} from "../../../../../../services/reimbursement.service";
import {FormField} from "../../../../../../shared/models/form-field.model";
import {IonModal} from "@ionic/angular";
import {unformatCash} from "../../../../../../core/directives/cash-format.directive";
import {ToastService} from "../../../../../../shared/services/toast.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-modal-reimbursement',
  templateUrl: './modal-reimbursement.component.html',
  styleUrls: ['./modal-reimbursement.component.scss'],
})
export class ModalReimbursementComponent extends BasicComponent<Reimbursement, ReimbursementService> implements OnInit {

  @Output() reimbursementSaved: EventEmitter<number> = new EventEmitter<number>();

  #toastService: ToastService = inject(ToastService);
  #activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  operationID: string | null = null;
  isAlertOpen = false;
  alertButtons = ['Close'];
  isLoading = false;

  errorMessage = {
    title: '',
    description: ''
  }

  protected formFields: FormField[] = [
    {
      fieldName: 'capital',
      value: null,
    },
    {
      fieldName: 'interest',
      value: null,
    }
  ];

  constructor(private reimbursementService: ReimbursementService) {
    super(reimbursementService);
  }

  ngOnInit() {
    this.buildForm().then(() => {
      this.operationID = this.#activatedRoute.snapshot.paramMap.get("operationID");
    });
  }

  save(modal: IonModal) {
    this.isLoading = true;
    this.entity = this.createObject();
    this.entity.capital = unformatCash(this.entity.capital);
    this.entity.interest = unformatCash(this.entity.interest);
    this.reimbursementService.save(this.entity, this.operationID).subscribe({
      next: data => {
        this.isLoading = false;
        this.#toastService.success("Reimbursement saved successfully.");
        this.reimbursementSaved.emit(this.entity.capital);
        modal.dismiss().then(() => {
          this.form.reset();
        });
      }, error: error => {
        if (error.status === 409) {
          this.errorMessage.title = "Error saving reimbursement";
          this.errorMessage.description = error.error.details;
          this.setOpen(true);
        } else {
          this.#toastService.error("There was an issue saving the reimbursement. Please try again.");
        }
      }
    });
  }

  cancel(modal: IonModal) {
    modal.dismiss().then(() => {
      this.form.reset();
    });
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = this.isLoading = isOpen;
  }

}
