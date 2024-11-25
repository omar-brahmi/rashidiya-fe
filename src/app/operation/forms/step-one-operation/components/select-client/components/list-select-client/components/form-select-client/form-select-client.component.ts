import {Component, EventEmitter, inject, OnInit, Output, ViewChild} from '@angular/core';
import {BasicComponent} from "../../../../../../../../../shared/forms/generics/forms/basic.component";
import {Client} from "../../../../../../../../../core/models/client.model";
import {ClientService} from "../../../../../../../../../services/client.service";
import {PhoneNumbersComponent} from "../../../../../phone-numbers/phone-numbers.component";
import {ActivatedRoute} from "@angular/router";
import {ToastService} from "../../../../../../../../../shared/services/toast.service";
import {FormField} from "../../../../../../../../../shared/models/form-field.model";
import {IonModal, NavController} from "@ionic/angular";
import {ProcessImageState} from "../../../../../../../../../shared/utils/getPhoto";

@Component({
  selector: 'app-form-select-client',
  templateUrl: './form-select-client.component.html',
  styleUrls: ['./form-select-client.component.scss'],
})
export class FormSelectClientComponent extends BasicComponent<Client, ClientService> implements OnInit {

  @Output() handleSelectedClient = new EventEmitter<Client>();

  @ViewChild(PhoneNumbersComponent) phoneNumbersComponent!: PhoneNumbersComponent;
  protected readonly ProcessImageState = ProcessImageState;

  #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  #toastService: ToastService = inject(ToastService);

  protected formFields: FormField[] = [
    {
      fieldName: 'card',
      value: null,
    },
    {
      fieldName: 'idCard',
      value: null,
    },
    {
      fieldName: 'firstname',
      value: null,
    },
    {
      fieldName: 'lastname',
      value: null,
    },
    {
      fieldName: 'phoneNumberDTOs',
      value: [],
    }
  ];

  isAlertOpen = false;
  alertButtons = ['Close'];

  client: Client | null = null;

  isUpdate: boolean = false;

  errorMessage = {
    title: '',
    description: ''
  }

  constructor(private clientService: ClientService, private navController: NavController) {
    super(clientService);
  }

  ngOnInit() {
    this.buildForm();
  }

  ionViewWillEnter() {
    this.getClient();
  }

  save(modal: IonModal) {
    this.populatedObject().then(entity => {
      this.entity = entity;
      if (this.isUpdate) {
        this.isUpdateClient();
      } else {
        this.isCreateClient(modal);
      }
    })
  }

  populatedObject(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const entity: Client = this.createObject();
        entity.phoneNumberDTOs = this.getPhoneNumbers();
        resolve(entity);
      } catch (error) {
        reject(error);
      }
    });
  }

  handleCardScanned(event: {
    imageUrl: string,
    cardNumber: string | null,
    firstName: string | null,
    lastName: string | null
  }) {
    this.form.get('card')?.setValue(event.imageUrl);
    this.form.get('idCard')?.setValue(event.cardNumber);
    this.form.get('firstname')?.setValue(event.firstName);
    this.form.get('lastname')?.setValue(event.lastName);
  }

  getPhoneNumbers() {
    return this.phoneNumbersComponent.phoneNumbers;
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  getClient() {
    const cardID = this.#activatedRoute.snapshot.paramMap.get("cardID");
    if (cardID) {
      this.clientService.getOneObservable(cardID).subscribe({
        next: value => {
          this.isUpdate = true;
          this.client = value;
          this.patchValueClient(value);
        }
      })
    }
  }

  patchValueClient(client: Client) {
    this.form.patchValue(client);
  }

  private isCreateClient(modal: IonModal) {
    this.create().then(value => {
      this.handleSelectedClient.emit(value);
      this.#toastService.success("Client saved successfully.");
      modal.dismiss();
    }).catch(error => {
      if (error.status === 409) {
        this.errorMessage.title = error.error.error;
        this.errorMessage.description = error.error.details;
        this.setOpen(true);
      } else {
        this.#toastService.error("Error saving Client.");
      }
    });
  }

  private isUpdateClient() {
    this.update().then(value => {
      this.#toastService.success("Client updated successfully.");
      this.navController.navigateRoot("/list-client");
    }).catch(error => {
      if (error.status === 409) {
        this.errorMessage.title = error.error.error;
        this.errorMessage.description = error.error.details;
        this.setOpen(true);
      } else {
        this.#toastService.error("Error updating Client.");
      }
    });
  }

}

