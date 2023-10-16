import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _httpClient: HttpClient) {
  }

  getCartProduct(strData: string): Observable<any> {
      return this._httpClient.get(`${environment.apiPrefixUrl}/admin/product/cart`, {params: {strData}});
  }

  getProductList(searchOptions: any, page: number, size: number): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (searchOptions) {
      params = params.set('key', searchOptions);
    }
    return this._httpClient.get(`${environment.apiPrefixUrl}/admin/product`, {params});
  }

  deleteProduct(id: number): Observable<any> {
    return this._httpClient.delete(`${environment.apiPrefixUrl}/admin/product/${id}`)
  }

  getProductDetail(id: number): Observable<any> {
    return this._httpClient.get(`${environment.apiPrefixUrl}/admin/product/${id}`)
  }

  postProduct(formData: any): Observable<any> {
    return this._httpClient.post(`${environment.apiPrefixUrl}/admin/product`, formData);
  }

  putProduct(formData: any): Observable<any> {
    return this._httpClient.put(`${environment.apiPrefixUrl}/admin/product`, formData);
  }
}
