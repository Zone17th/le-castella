import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffFormComponent } from './staff-form/staff-form.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzInputModule} from "ng-zorro-antd/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzSelectModule} from "ng-zorro-antd/select";


@NgModule({
  declarations: [
    StaffListComponent,
    StaffFormComponent,
    AddStaffComponent,
    EditStaffComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    NzBreadCrumbModule,
    NzInputModule,
    FormsModule,
    NzIconModule,
    NzButtonModule,
    NzTableModule,
    NzPaginationModule,
    NzPopconfirmModule,
    NzFormModule,
    ReactiveFormsModule,
    NzSelectModule
  ]
})
export class StaffModule { }
