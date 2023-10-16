import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private _httpClient: HttpClient) { }

  getStaffList(searchOptions: any, page : number, size: number): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (searchOptions) {
      params = params.set('key', searchOptions);
    }
    return this._httpClient.get(`${environment.apiPrefixUrl}/admin/staff`, {params});
  }
  getDetailStaff(id : number): Observable<any> {
    return this._httpClient.get(`${environment.apiPrefixUrl}/admin/staff/${id}`);
  }
  createStaff(payLoad : any) : Observable<any> {
    return this._httpClient.post(`${environment.apiPrefixUrl}/admin/staff`, payLoad);
  }
  updateStaff(payLoad : any) : Observable<any> {
    return this._httpClient.put(`${environment.apiPrefixUrl}/admin/staff`, payLoad);
  }
  deleteStaff(id : number) : Observable<any> {
    return this._httpClient.delete(`${environment.apiPrefixUrl}/admin/staff/${id}`);
  }
}
