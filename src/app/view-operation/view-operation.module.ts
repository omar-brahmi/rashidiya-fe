import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewOperationPageRoutingModule } from './view-operation-routing.module';

import { ViewOperationPage } from './view-operation.page';
import {NgxIonicImageViewerModule} from "@herdwatch-apps/ngx-ionic-image-viewer";
import {HomePageModule} from "../home/home.module";
import {ListPageModule} from "../operation/list/list.module";
import {OperationDetailComponent} from "./components/operation-detail/operation-detail.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ViewOperationPageRoutingModule,
        NgxIonicImageViewerModule,
        HomePageModule,
        ListPageModule,
        OperationDetailComponent
    ],
  declarations: [ViewOperationPage]
})
export class ViewOperationPageModule {}
