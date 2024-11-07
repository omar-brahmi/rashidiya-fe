import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPageRoutingModule } from './view-routing.module';

import { ViewPage } from './view.page';
import {HomePageModule} from "../../home/home.module";
import {ListPageModule} from "../list/list.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ViewPageRoutingModule,
        HomePageModule,
        ListPageModule
    ],
  declarations: [ViewPage]
})
export class ViewPageModule {}
