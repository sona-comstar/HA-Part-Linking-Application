import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from "../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseUrl = `${environment.apiUrl}/customers`;

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  addCustomer(customer: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, customer);
  }

  addModel(customerId: number, model: string, boxQuantity:number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${customerId}/add-model`, { model,boxQuantity });
  }

  deleteCustomer(customerId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${customerId}`);
  }
  fetchCustomerForReprintofLabel(): Observable<any>{
    return this.http.get<any[]>(`${this.baseUrl}/fetchCustomerForReprint`);
  }

  fetchModelForReprint(selectedCustomerId:any): Observable<any>{
    return this.http.get<any[]>(`${this.baseUrl}/fetchModelsForReprint?customerId=${selectedCustomerId}`);
  }
}
