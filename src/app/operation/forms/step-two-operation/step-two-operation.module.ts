import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StepTwoOperationPageRoutingModule } from './step-two-operation-routing.module';

import { StepTwoOperationPage } from './step-two-operation.page';
import {HomePageModule} from "../../../home/home.module";
import {ListPageModule} from "../../list/list.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        StepTwoOperationPageRoutingModule,
        HomePageModule,
        ListPageModule
    ],
  declarations: [StepTwoOperationPage]
})
export class StepTwoOperationPageModule {}
