import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ReportingPage} from './reporting.page';

const routes: Routes = [
  {
    path: '',
    component: ReportingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportingPageRoutingModule {
}
