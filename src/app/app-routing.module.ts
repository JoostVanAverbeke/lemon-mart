import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/:redirectUrl', component: LoginComponent },
  { path: 'manager', loadChildren: () => import('./manager/manager.module')
      .then(m => m.ManagerModule)},
  { path: 'user', loadChildren: () => import('./user/user.module')
      .then(m => m.UserModule)},
  { path: 'pos', loadChildren: () => import('./pos/pos.module')
      .then(m => m.PosModule)},
  { path: 'inventory', loadChildren: () => import('./inventory/inventory.module')
      .then(m => m.InventoryModule)},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
