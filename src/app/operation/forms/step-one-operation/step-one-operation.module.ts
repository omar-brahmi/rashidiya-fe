import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StepOneOperationPageRoutingModule } from './step-one-operation-routing.module';

import { StepOneOperationPage } from './step-one-operation.page';
import {HomePageModule} from "../../../home/home.module";
import {ListPageModule} from "../../list/list.module";
import {AutoHyphenDirective} from "../../../core/directives/auto-hyphen.directive";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StepOneOperationPageRoutingModule,
    HomePageModule,
    ListPageModule,
    ReactiveFormsModule,
    AutoHyphenDirective
  ],
  declarations: [StepOneOperationPage]
})
export class StepOneOperationPageModule {}
