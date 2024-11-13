import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ReportingPageRoutingModule} from './reporting-routing.module';

import {ReportingPage} from './reporting.page';
import {HomePageModule} from "../home/home.module";
import {ListPageModule} from "../operation/list/list.module";
import {ReminderComponent} from "./components/reminder/reminder.component";
import {CardReminderComponent} from "./components/reminder/components/card-reminder/card-reminder.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportingPageRoutingModule,
    HomePageModule,
    ListPageModule
  ],
  declarations: [ReportingPage, ReminderComponent, CardReminderComponent]
})
export class ReportingPageModule {
}
