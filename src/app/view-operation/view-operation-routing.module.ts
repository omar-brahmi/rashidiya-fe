import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewOperationPage } from './view-operation.page';

const routes: Routes = [
  {
    path: '',
    component: ViewOperationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewOperationPageRoutingModule {}
