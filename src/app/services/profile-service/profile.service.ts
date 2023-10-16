import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environment/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _httpClient: HttpClient) { }

  getProfile(): Observable<any> {
    return this._httpClient.get(`${environment.apiPrefixUrl}/admin/profile`);
  }
  updateProfile(payLoad : any) : Observable<any> {
    return this._httpClient.put(`${environment.apiPrefixUrl}/admin/profile`, payLoad);
  }
  changePassword(payLoad : any) : Observable<any> {
    return this._httpClient.put(`${environment.apiPrefixUrl}/admin/profile/password`, payLoad);
  }
}
