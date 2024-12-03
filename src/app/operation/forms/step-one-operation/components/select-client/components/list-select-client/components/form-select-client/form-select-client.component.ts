import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {BasicComponent} from "../../../../../../../../../shared/forms/generics/forms/basic.component";
import {Client} from "../../../../../../../../../core/models/client.model";
import {ClientService} from "../../../../../../../../../services/client.service";
import {PhoneNumbersComponent} from "../../../../../phone-numbers/phone-numbers.component";
import {ToastService} from "../../../../../../../../../shared/services/toast.service";
import {FormField} from "../../../../../../../../../shared/models/form-field.model";
import {IonModal, Platform} from "@ionic/angular";
import {ProcessImageState} from "../../../../../../../../../shared/utils/getPhoto";
import {Subscription} from "rxjs";
import {PhoneNumber} from "../../../../../../../../../core/models/phoneNumber.model";

@Component({
  selector: 'app-form-select-client',
  templateUrl: './form-select-client.component.html',
  styleUrls: ['./form-select-client.component.scss'],
})
export class FormSelectClientComponent extends BasicComponent<Client, ClientService> implements OnInit, OnChanges, OnDestroy {

  @ViewChild(IonModal) modal!: IonModal;

  @Input() modalName: string = "create";
  @Input() client: Client | null = null;
  @Output() handleSelectedClient = new EventEmitter<Client>();

  @ViewChild(PhoneNumbersComponent) phoneNumbersComponent!: PhoneNumbersComponent;
  protected readonly ProcessImageState = ProcessImageState;

  #toastService: ToastService = inject(ToastService);
  #platform: Platform = inject(Platform);

  private backButtonSubscription?: Subscription;
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
      fieldName: 'oldIdCard',
      value: null,
    },
    {
      fieldName: 'phoneNumberDTOs',
      value: [],
    }
  ];

  isAlertOpen = false;
  alertButtons = ['Close'];
  isLoading = false;

  isUpdate: boolean = false;

  errorMessage = {
    title: '',
    description: ''
  }

  constructor(private clientService: ClientService) {
    super(clientService);
    this.buildForm();
  }

  ngOnInit() {
    // Handle hardware back button
    this.backButtonSubscription = this.#platform.backButton.subscribeWithPriority(10, () => {
      if (this.modal?.isOpen) {
        this.modal.dismiss();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['client']) {
      this.patchValueClient();
    }
  }

  save(modal: IonModal) {
    this.isLoading = true;
    this.populatedObject().then(entity => {
      this.entity = entity;
      if (this.isUpdate) {
        this.isUpdateClient(modal);
      } else if (this.entity.idCard) {
        this.isCreateClient(modal);
      } else {
        this.errorMessage.title = "ID Card is required";
        this.errorMessage.description = "ID Card must be not empty";
        this.setOpen(true);
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

  getPhoneNumbers(): PhoneNumber[] {
    const phoneNumbers: PhoneNumber[] = [];
    for (let phone of this.phoneNumbersComponent.phoneNumbers) {
      if (phone.number) {
        phoneNumbers.push(phone);
      }
    }
    return phoneNumbers;
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = this.isLoading = isOpen;
  }

  patchValueClient() {
    if (this.client) {
      this.isUpdate = true;
      this.form.patchValue(this.client);
      this.form.get('oldIdCard')?.setValue(this.client.idCard);
    }
  }

  private isCreateClient(modal: IonModal) {
    this.create().then(value => {
      this.handleSelectedClient.emit(value);
      this.#toastService.success("Client saved successfully.");
      this.isLoading = false;
      modal.dismiss();
    }).catch(error => {
      this.isLoading = false;
      if (error.status === 409) {
        this.errorMessage.title = error.error.error;
        this.errorMessage.description = error.error.details;
        this.setOpen(true);
      } else {
        this.#toastService.error("Error saving Client.");
      }
    });
  }

  private isUpdateClient(modal: IonModal) {
    this.update().then(value => {
      this.handleSelectedClient.emit(value);
      this.#toastService.success("Client updated successfully.");
      this.isLoading = false;
      modal.dismiss();
    }).catch(error => {
      this.isLoading = false;
      if (error.status === 409) {
        this.errorMessage.title = error.error.error;
        this.errorMessage.description = error.error.details;
        this.setOpen(true);
      } else {
        this.#toastService.error("Error updating Client.");
      }
    });
  }

  ngOnDestroy() {
    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }
  }

}

