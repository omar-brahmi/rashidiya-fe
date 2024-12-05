import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ReimbursementPageRoutingModule} from './reimbursement-routing.module';

import {ReimbursementPage} from './reimbursement.page';
import {ListPageModule} from "../list/list.module";
import {HomePageModule} from "../../home/home.module";
import {OperationDetailComponent} from "../../view-operation/components/operation-detail/operation-detail.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReimbursementPageRoutingModule,
        ListPageModule,
        HomePageModule,
        OperationDetailComponent
    ],
  declarations: [ReimbursementPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReimbursementPageModule {
}
