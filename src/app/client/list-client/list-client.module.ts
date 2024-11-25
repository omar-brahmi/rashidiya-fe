import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListClientPageRoutingModule } from './list-client-routing.module';

import { ListClientPage } from './list-client.page';
import {ListPageModule} from "../../operation/list/list.module";
import {HomePageModule} from "../../home/home.module";
import {FilterClientComponent} from "./components/filter-client/filter-client.component";
import {AutoHyphenDirective} from "../../core/directives/auto-hyphen.directive";
import {CardClientComponent} from "./components/card-client/card-client.component";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListClientPageRoutingModule,
    ListPageModule,
    HomePageModule,
    AutoHyphenDirective,
    SharedModule
  ],
  exports: [
    FilterClientComponent
  ],
  declarations: [ListClientPage, FilterClientComponent, CardClientComponent]
})
export class ListClientPageModule {}
