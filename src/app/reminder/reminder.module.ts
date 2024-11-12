import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReminderPageRoutingModule } from './reminder-routing.module';

import { ReminderPage } from './reminder.page';
import {ListPageModule} from "../operation/list/list.module";
import {HomePageModule} from "../home/home.module";
import {CardReminderComponent} from "./components/card-reminder/card-reminder.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReminderPageRoutingModule,
    ListPageModule,
    HomePageModule
  ],
  declarations: [ReminderPage, CardReminderComponent]
})
export class ReminderPageModule {}
