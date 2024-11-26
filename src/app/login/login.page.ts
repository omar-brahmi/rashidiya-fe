import {Component} from '@angular/core';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private navCtrl: NavController) {
  }

  signIn() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    this.navCtrl.navigateForward('/home');
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
