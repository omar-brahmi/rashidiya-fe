import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {CardOperationComponent} from "../shared/components/card-operation/card-operation.component";
import {FooterComponent} from "../shared/components/footer/footer.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  exports: [
    CardOperationComponent,
    FooterComponent
  ],
  declarations: [HomePage, CardOperationComponent, FooterComponent]
})
export class HomePageModule {}
