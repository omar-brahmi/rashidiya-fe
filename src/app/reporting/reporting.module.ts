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
import {ConsultationComponent} from "./components/consultation/consultation.component";
import {BalancePerDayComponent} from "./components/balance-per-day/balance-per-day.component";
import {SharedModule} from "../shared/shared.module";
import {AutoHyphenDirective} from "../core/directives/auto-hyphen.directive";
import {
  FilterBalancePerDayComponent
} from "./components/balance-per-day/components/filter-balance-per-day/filter-balance-per-day.component";
import {CardClientComponent} from "../client/list-client/components/card-client/card-client.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportingPageRoutingModule,
    HomePageModule,
    ListPageModule,
    SharedModule,
    AutoHyphenDirective
  ],
  declarations: [ReportingPage, ReminderComponent, CardReminderComponent, ConsultationComponent, BalancePerDayComponent, CardClientComponent, FilterBalancePerDayComponent]
})
export class ReportingPageModule {
}
