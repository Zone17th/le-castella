import { Injectable } from '@angular/core';
import jwtDecode from "jwt-decode";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private _httpClient: HttpClient) { }

  accessToken: string | null = localStorage.getItem('accessToken');

  // Phương thức để lấy thông tin vai trò từ AccessToken
  getDataFromAccessToken() {
    try {
      if (!this.accessToken) {
        return null;
      }
      const decodedToken = jwtDecode(this.accessToken);
      // 'roles' là key mà bạn đã sử dụng để lưu thông tin vai trò trong AccessToken
      console.log(decodedToken);
      return decodedToken;
    } catch (error) {
      console.error('Lỗi khi giải mã AccessToken:', error);
      return null;
    }
  }
  login(authPayload: {username: string, password: string}): Observable<any> {
    return this._httpClient.post(`${environment.apiPrefixUrl}/admin/account/login`, authPayload);
  }
  logout(): Observable<any> {
    return this._httpClient.post(`${environment.apiPrefixUrl}/admin/account/logout`,{});
  }
}
