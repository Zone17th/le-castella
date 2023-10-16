import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { CreateOrderComponent } from './create-order/create-order.component';
import { ListOrderComponent } from './list-order/list-order.component';
import { FormOrderComponent } from './form-order/form-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { DetailOrderComponent } from './detail-order/detail-order.component';
import {CartDataComponent} from "../../layout/private-layout/cart-data/cart-data.component";


@NgModule({
  declarations: [
    CreateOrderComponent,
    ListOrderComponent,
    FormOrderComponent,
    EditOrderComponent,
    DetailOrderComponent
  ],
    imports: [
        CommonModule,
        OrderRoutingModule,
        CartDataComponent
    ]
})
export class OrderModule { }
