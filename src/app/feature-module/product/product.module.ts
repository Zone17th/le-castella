import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzInputModule} from "ng-zorro-antd/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {CartDataComponent} from "../../layout/private-layout/cart-data/cart-data.component";
import {NzModalModule} from "ng-zorro-antd/modal";


@NgModule({
  declarations: [
    ProductComponent,
  ],
    imports: [
        CommonModule,
        ProductRoutingModule,
        NzBreadCrumbModule,
        NzInputModule,
        FormsModule,
        NzButtonModule,
        NzIconModule,
        NzTableModule,
        NzPaginationModule,
        NzFormModule,
        ReactiveFormsModule,
        NzInputNumberModule,
        CartDataComponent,
        NzModalModule
    ]
})
export class ProductModule { }
