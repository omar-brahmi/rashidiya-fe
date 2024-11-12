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

  constructor(private navCtrl: NavController) {
  }

  signIn() {
    // Add your login logic here
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    // Navigate to another page if needed
    this.navCtrl.navigateForward('/home');
  }
}
