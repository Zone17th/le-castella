import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StaffListComponent} from "./staff-list/staff-list.component";
import {AddStaffComponent} from "./add-staff/add-staff.component";
import {EditStaffComponent} from "./edit-staff/edit-staff.component";

const routes: Routes = [
  {path: '', component: StaffListComponent},
  {path: 'create', component: AddStaffComponent},
  {path: 'edit/:id', component: EditStaffComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
