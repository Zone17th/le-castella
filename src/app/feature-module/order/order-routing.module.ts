import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListOrderComponent} from "./list-order/list-order.component";
import {CreateOrderComponent} from "./create-order/create-order.component";
import {EditOrderComponent} from "./edit-order/edit-order.component";
import {DetailOrderComponent} from "./detail-order/detail-order.component";

const routes: Routes = [
  {path: '', component: ListOrderComponent},
  {path: 'create', component: CreateOrderComponent},
  {path: 'edit/:id', component: EditOrderComponent},
  {path: ':id', component: DetailOrderComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
