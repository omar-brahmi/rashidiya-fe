import {Component, inject, Input} from '@angular/core';
import {Operation} from "../../../core/models/operation.model";
import {OperationService} from "../../../services/operation.service";
import {ToastService} from "../../services/toast.service";
import {Status} from "../../../core/models/enumerations/status.enum";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  #operationService: OperationService = inject(OperationService);
  #toastService: ToastService = inject(ToastService);

  protected readonly Status = Status;

  @Input() title: string = "";
  @Input() backUrl: string = "/home";
  @Input() operation: Operation | null = null;

  constructor(private nav: NavController) {
  }

  public actionSheetButtons = [
    {
      text: 'Confirm',
      role: 'confirm',
      data: {
        action: 'confirm',
      },
      icon: 'checkmark-circle-outline',
      cssClass: 'confirm-button'
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
      icon: 'close-circle-outline',
      cssClass: 'cancel-button'
    }
  ];

  logResult(ev: { detail: any; }) {
    if (ev.detail.role === "confirm") {
      this.#operationService.validateOperation(this.operation?.operationID).subscribe({
        next: value => {
          this.#toastService.success("Operation validated successfully!");
          this.backButton();
        }, error: err => {
          this.#toastService.error("An error occurred while validating the operation.");
        }
      })
    }
  }

  backButton() {
    if (this.backUrl.includes("reporting")) {
      this.nav.navigateBack("/reporting?reminder=true");
    } else {
      this.nav.back({animated: true})
    }
  }

}
