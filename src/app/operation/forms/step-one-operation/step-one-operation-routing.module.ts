import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StepOneOperationPage } from './step-one-operation.page';

const routes: Routes = [
  {
    path: '',
    component: StepOneOperationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StepOneOperationPageRoutingModule {}
