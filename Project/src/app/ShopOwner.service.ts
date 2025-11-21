import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopOwnerService {
  private apiUrl = 'http://localhost:8082/ownerdetail'; // your backend URL

  constructor(private http: HttpClient) {}

  registerShopOwners(shopOwner: any): Observable<any> {
    // Replace with this.http.post(...) if backend available
    return this.http.post(this.apiUrl, shopOwner);
  }

  getShopOwners(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  deleteShopOwners(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateShopOwners(shopOwner: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${shopOwner.id}`, shopOwner);
  }
}
