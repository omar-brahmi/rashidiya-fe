import {Injectable} from '@angular/core';
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) {
  }

  async success(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: 'success',
      cssClass: 'custom-toast',
      position: 'top'
    });
    await toast.present();
  }

  async error(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: 'danger',
      position: 'top'
    });
    await toast.present();
  }
}
