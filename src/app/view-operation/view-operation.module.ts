import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewOperationPageRoutingModule } from './view-operation-routing.module';

import { ViewOperationPage } from './view-operation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewOperationPageRoutingModule
  ],
  declarations: [ViewOperationPage]
})
export class ViewOperationPageModule {}
