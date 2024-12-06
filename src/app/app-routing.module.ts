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
    path: 'operations/view/:operationID',
    loadChildren: () => import('./operation/view/view.module').then(m => m.ViewPageModule)
  },
  {
    path: 'form/step-one-operation',
    loadChildren: () => import('./operation/forms/step-one-operation/step-one-operation.module').then(m => m.StepOneOperationPageModule)
  },
  {
    path: 'form/step-one-operation/:operationID',
    loadChildren: () => import('./operation/forms/step-one-operation/step-one-operation.module').then(m => m.StepOneOperationPageModule)
  },
  {
    path: 'operations/reimbursement/:operationID',
    loadChildren: () => import('./operation/reimbursement/reimbursement.module').then(m => m.ReimbursementPageModule)
  },
  {
    path: 'operations/cancel/:operationID',
    loadChildren: () => import('./operation/cancel/cancel.module').then(m => m.CancelPageModule)
  },
  {
    path: 'reporting',
    loadChildren: () => import('./reporting/reporting.module').then(m => m.ReportingPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'list-client',
    loadChildren: () => import('./client/list-client/list-client.module').then(m => m.ListClientPageModule)
  },
  {
    path: 'form-client',
    loadChildren: () => import('./client/form-client/form-client.module').then(m => m.FormClientPageModule)
  },
  {
    path: 'form-client/:cardID',
    loadChildren: () => import('./client/form-client/form-client.module').then(m => m.FormClientPageModule)
  },
  {
    path: 'view-operation/:operationID',
    loadChildren: () => import('./view-operation/view-operation.module').then( m => m.ViewOperationPageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./user/user-profile/user-profile.module').then( m => m.UserProfilePageModule)
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
