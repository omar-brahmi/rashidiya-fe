import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CancelPageRoutingModule } from './cancel-routing.module';

import { CancelPage } from './cancel.page';
import {HomePageModule} from "../../home/home.module";
import {ListPageModule} from "../list/list.module";
import {NgxIonicImageViewerModule} from "@herdwatch-apps/ngx-ionic-image-viewer";
import {AutoHyphenDirective} from "../../core/directives/auto-hyphen.directive";
import {WeightInputDirective} from "../../core/directives/weight-input.directive";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CancelPageRoutingModule,
    HomePageModule,
    ListPageModule,
    NgxIonicImageViewerModule,
    ReactiveFormsModule,
    AutoHyphenDirective,
    WeightInputDirective
  ],
  declarations: [CancelPage]
})
export class CancelPageModule {}
