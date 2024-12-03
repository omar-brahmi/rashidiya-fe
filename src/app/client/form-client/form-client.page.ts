import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {BasicComponent} from "../../shared/forms/generics/forms/basic.component";
import {Client} from "../../core/models/client.model";
import {ClientService} from "../../services/client.service";
import {FormField} from "../../shared/models/form-field.model";
import {ProcessImageState} from "../../shared/utils/getPhoto";
import {
  PhoneNumbersComponent
} from "../../operation/forms/step-one-operation/components/phone-numbers/phone-numbers.component";
import {ToastService} from "../../shared/services/toast.service";
import {NavController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {PhoneNumber} from "../../core/models/phoneNumber.model";

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.page.html',
  styleUrls: ['./form-client.page.scss'],
})
export class FormClientPage extends BasicComponent<Client, ClientService> implements OnInit {

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
    },
    {
      fieldName: 'oldIdCard',
      value: null,
    }
  ];

  isAlertOpen = false;
  alertButtons = ['Close'];
  isLoading = false;

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

  save() {
    this.isLoading = true;
    this.populatedObject().then(entity => {
      this.entity = entity;
      if (this.isUpdate) {
        this.isUpdateClient();
      } else if (this.entity.idCard) {
        this.isCreateClient();
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
        console.log(entity.phoneNumberDTOs)
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
    this.form.get('oldIdCard')?.setValue(client.idCard);
  }

  private isCreateClient() {
    this.create().then(value => {
      this.isLoading = false;
      this.#toastService.success("Client saved successfully.");
      this.navController.navigateRoot("/list-client");
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

  private isUpdateClient() {
    this.update().then(value => {
      this.isLoading = false;
      this.#toastService.success("Client updated successfully.");
      this.navController.navigateRoot("/list-client");
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

}
