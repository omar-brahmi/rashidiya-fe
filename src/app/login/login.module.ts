import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import {AutoHyphenDirective} from "../core/directives/auto-hyphen.directive";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LoginPageRoutingModule,
        AutoHyphenDirective,
        ReactiveFormsModule
    ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
