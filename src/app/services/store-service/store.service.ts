import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private _httpClient: HttpClient) { }

  getAllStore(): Observable<any> {
    return this._httpClient.get(`${environment.apiPrefixUrl}/admin/store`);
  }
}
