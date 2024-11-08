import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPageRoutingModule } from './view-routing.module';

import { ViewPage } from './view.page';
import {HomePageModule} from "../../home/home.module";
import {ListPageModule} from "../list/list.module";
import {NgxIonicImageViewerModule} from "@herdwatch-apps/ngx-ionic-image-viewer";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ViewPageRoutingModule,
        HomePageModule,
        ListPageModule,
        NgxIonicImageViewerModule
    ],
  declarations: [ViewPage]
})
export class ViewPageModule {}
