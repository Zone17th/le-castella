import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { vi_VN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LayoutModule} from "./layout/layout.module";
import { IncomeComponent } from './feature-module/income/income.component';
import {HTTP_INTERCEPTOR_PROVIDERS} from "./interceptor";

registerLocaleData(vi);

@NgModule({
  declarations: [
    AppComponent,
    IncomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule
  ],
  providers: [
    {provide: NZ_I18N, useValue: vi_VN},
    HTTP_INTERCEPTOR_PROVIDERS,

  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
