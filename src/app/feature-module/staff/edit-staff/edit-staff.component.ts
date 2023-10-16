import {Component, OnInit} from '@angular/core';
import {StaffService} from "../../../services/staff-service/staff.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.scss']
})
export class EditStaffComponent implements OnInit {
  staffData! : any;
  id! : number;

  constructor(private _staffService : StaffService,
              private _activatedRoute : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // @ts-ignore
    this._activatedRoute.paramMap.subscribe( params => this.id = +params.get('id'))
    this.loadStaff();
  }
  loadStaff() {
    this._staffService.getDetailStaff(this.id).subscribe({
      next : resp => {
        console.log(resp); // FIXME
        this.staffData = {
          id : resp.id,
          username: resp.username,
          fullName : resp.fullName,
          store : resp.store,
        };
      }, error : err => {
        console.error(err)
      }
    })
  }
}
