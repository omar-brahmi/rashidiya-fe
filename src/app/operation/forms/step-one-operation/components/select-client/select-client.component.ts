import {Component, EventEmitter, inject, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Client} from "../../../../../core/models/client.model";
import {IonModal, Platform} from "@ionic/angular";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-select-client',
  templateUrl: './select-client.component.html',
  styleUrls: ['./select-client.component.scss'],
})
export class SelectClientComponent implements OnInit, OnDestroy {

  @ViewChild(IonModal) modal!: IonModal;

  @Output() handleSelectedClient = new EventEmitter<Client>();

  #platform: Platform = inject(Platform);

  private backButtonSubscription?: Subscription;

  ngOnInit(): void {
    // Handle hardware back button
    this.backButtonSubscription = this.#platform.backButton.subscribeWithPriority(10, () => {
      if (this.modal?.isOpen) {
        this.setOpen(false);
      }
    });
  }

  setOpen(isOpen: boolean) {
    if (isOpen) {
      this.modal.present();
    } else {
      this.modal.dismiss();
    }
  }

  selectedClient($event: Client) {
    this.handleSelectedClient.emit($event);
    this.setOpen(false);
  }

  ngOnDestroy(): void {
    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }
  }

}
