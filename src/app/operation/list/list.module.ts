import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPageRoutingModule } from './list-routing.module';

import { ListPage } from './list.page';
import {HomePageModule} from "../../home/home.module";
import {HeaderComponent} from "../../shared/components/header/header.component";
import {UploadCardIdComponent} from "../forms/step-one-operation/components/upload-card-id/upload-card-id.component";
import {
  UploadContractComponent
} from "../forms/step-one-operation/components/upload-contract/upload-contract.component";
import {PhoneNumbersComponent} from "../forms/step-one-operation/components/phone-numbers/phone-numbers.component";
import {ListReimbursementComponent} from "../reimbursement/components/list-reimbursement/list-reimbursement.component";
import {
  ModalReimbursementComponent
} from "../reimbursement/components/list-reimbursement/components/modal-reimbursement/modal-reimbursement.component";
import {NgxIonicImageViewerModule} from "@herdwatch-apps/ngx-ionic-image-viewer";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPageRoutingModule,
    HomePageModule,
    NgxIonicImageViewerModule
  ],
    exports: [
        HeaderComponent,
        UploadCardIdComponent,
        UploadContractComponent,
        PhoneNumbersComponent,
        ListReimbursementComponent
    ],
  declarations: [ListPage, HeaderComponent, UploadCardIdComponent, UploadContractComponent, PhoneNumbersComponent, ListReimbursementComponent, ModalReimbursementComponent]
})
export class ListPageModule {}
