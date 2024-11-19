import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormClientPageRoutingModule } from './form-client-routing.module';

import { FormClientPage } from './form-client.page';
import {ListPageModule} from "../../operation/list/list.module";
import {HomePageModule} from "../../home/home.module";
import {AutoHyphenDirective} from "../../core/directives/auto-hyphen.directive";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormClientPageRoutingModule,
    ListPageModule,
    HomePageModule,
    AutoHyphenDirective,
    ReactiveFormsModule
  ],
  declarations: [FormClientPage]
})
export class FormClientPageModule {}
