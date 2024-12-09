import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {AuthenticationRequest} from "../core/models/AuthenticationRequest.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  #authenticationService: AuthenticationService = inject(AuthenticationService);

  form = new FormGroup({
    username: new FormControl({value: null, disabled: false}, [Validators.required]),
    password: new FormControl({value: null, disabled: false}, [Validators.required]),
  });

  showPassword: boolean = false;

  signIn() {
    this.form.markAllAsTouched();
    if (!this.form.invalid && this.form.value.username && this.form.value.password) {
      const authenticationRequest: AuthenticationRequest = {
        username: this.form.value.username,
        password: this.form.value.password
      };
      this.#authenticationService.authentication(authenticationRequest);
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

}
