import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StepTwoOperationPage } from './step-two-operation.page';

const routes: Routes = [
  {
    path: '',
    component: StepTwoOperationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StepTwoOperationPageRoutingModule {}
