import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {HomePage} from './home.page';

import {HomePageRoutingModule} from './home-routing.module';
import {CardOperationComponent} from "../shared/components/card-operation/card-operation.component";
import {FooterComponent} from "../shared/components/footer/footer.component";
import {CardHomeClientComponent} from "./components/card-home-client/card-home-client.component";
import {CardHomeOperationComponent} from "./components/card-home-operation/card-home-operation.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    CardHomeClientComponent,
    CardHomeOperationComponent
  ],
  exports: [
    CardOperationComponent,
    FooterComponent
  ],
  declarations: [HomePage, CardOperationComponent, FooterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageModule {
}
