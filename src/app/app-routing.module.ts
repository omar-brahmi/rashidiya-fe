import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'operations',
    loadChildren: () => import('./operation/list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'operations/view',
    loadChildren: () => import('./operation/view/view.module').then(m => m.ViewPageModule)
  },
  {
    path: 'form/step-one-operation',
    loadChildren: () => import('./operation/forms/step-one-operation/step-one-operation.module').then(m => m.StepOneOperationPageModule)
  },
  {
    path: 'form/step-two-operation',
    loadChildren: () => import('./operation/forms/step-two-operation/step-two-operation.module').then(m => m.StepTwoOperationPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'operations/reimbursement',
    loadChildren: () => import('./operation/reimbursement/reimbursement.module').then( m => m.ReimbursementPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'top'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}