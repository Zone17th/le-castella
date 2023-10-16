import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PrivateLayoutComponent} from "./layout/private-layout/private-layout.component";
import {authGuard} from "./guard/auth.guard";
import {EmptyLayoutComponent} from "./layout/empty-layout/empty-layout.component";
import {ForbidenComponent} from "./layout/error-layout/forbiden/forbiden.component";
import {NotfoundComponent} from "./layout/error-layout/notfound/notfound.component";
import {IncomeComponent} from "./feature-module/income/income.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'admin'},
  {
    path: 'admin', component: PrivateLayoutComponent,
    canActivate : [authGuard],
    children: [
      {path: '', pathMatch: "full", redirectTo: 'product'},
      {path: 'product', loadChildren: () => import('./feature-module/product/product.module').then(m => m.ProductModule)},
      {path: 'order', loadChildren: () => import('./feature-module/order/order.module').then(m => m.OrderModule)},
      {path: 'staff', loadChildren: () => import('./feature-module/staff/staff.module').then(m => m.StaffModule)},
      {path: 'income', component: IncomeComponent},
      {path: 'profile', loadChildren: () => import('./feature-module/user/user.module').then(m => m.UserModule)},
    ]
  },
  {
    path: 'auth',
    component: EmptyLayoutComponent,
    loadChildren: () => import('./feature-module/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'error/403',
    component: ForbidenComponent,
  },  {
    path: 'error/404',
    component: NotfoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
