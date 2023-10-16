import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from "@angular/router";
import { ForbidenComponent } from './error-layout/forbiden/forbiden.component';
import { NotfoundComponent } from './error-layout/notfound/notfound.component';
import {PrivateLayoutComponent} from "./private-layout/private-layout.component";
import {EmptyLayoutComponent} from "./empty-layout/empty-layout.component";
import { HeaderComponent } from './private-layout/header/header.component';
import { FooterComponent } from './private-layout/footer/footer.component';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzButtonModule} from "ng-zorro-antd/button";
import {CartDataComponent} from "./private-layout/cart-data/cart-data.component";

@NgModule({
  declarations: [
    ForbidenComponent,
    NotfoundComponent,
    PrivateLayoutComponent,
    EmptyLayoutComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    NzLayoutModule,
    NzMenuModule,
    NzToolTipModule,
    NzIconModule,
    NzModalModule,
    NzButtonModule,
    CartDataComponent,
  ]
})
export class LayoutModule { }
