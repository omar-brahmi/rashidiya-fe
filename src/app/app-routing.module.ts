import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {Role} from "./core/models/user.model";
import {RoleGuard} from "./core/guards/role.guard";
import {AuthGuard} from "./core/guards/auth.guard";
import {loggedInGuard} from "./core/guards/logged-in.guard";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: [Role.ADMIN, Role.USER]}
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
    canActivate: [loggedInGuard]
  },
  {
    path: 'operations',
    loadChildren: () => import('./operation/list/list.module').then(m => m.ListPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: [Role.ADMIN, Role.USER]}
  },
  {
    path: 'operations/view/:operationID',
    loadChildren: () => import('./operation/view/view.module').then(m => m.ViewPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: [Role.ADMIN, Role.USER]}
  },
  {
    path: 'form/step-one-operation',
    loadChildren: () => import('./operation/forms/step-one-operation/step-one-operation.module').then(m => m.StepOneOperationPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: [Role.ADMIN, Role.USER]}
  },
  {
    path: 'form/step-one-operation/:operationID',
    loadChildren: () => import('./operation/forms/step-one-operation/step-one-operation.module').then(m => m.StepOneOperationPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: [Role.ADMIN, Role.USER]}
  },
  {
    path: 'operations/reimbursement/:operationID',
    loadChildren: () => import('./operation/reimbursement/reimbursement.module').then(m => m.ReimbursementPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: [Role.ADMIN, Role.USER]}
  },
  {
    path: 'operations/cancel/:operationID',
    loadChildren: () => import('./operation/cancel/cancel.module').then(m => m.CancelPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: [Role.ADMIN, Role.USER]}
  },
  {
    path: 'reporting',
    loadChildren: () => import('./reporting/reporting.module').then(m => m.ReportingPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: [Role.ADMIN, Role.USER]}
  },
  {
    path: 'list-client',
    loadChildren: () => import('./client/list-client/list-client.module').then(m => m.ListClientPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: [Role.ADMIN, Role.USER]}
  },
  {
    path: 'form-client',
    loadChildren: () => import('./client/form-client/form-client.module').then(m => m.FormClientPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: [Role.ADMIN, Role.USER]}
  },
  {
    path: 'form-client/:cardID',
    loadChildren: () => import('./client/form-client/form-client.module').then(m => m.FormClientPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: [Role.ADMIN, Role.USER]}
  },
  {
    path: 'view-operation/:operationID',
    loadChildren: () => import('./view-operation/view-operation.module').then(m => m.ViewOperationPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: [Role.ADMIN, Role.USER]}
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./user/user-profile/user-profile.module').then(m => m.UserProfilePageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: [Role.ADMIN, Role.USER]}
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
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
