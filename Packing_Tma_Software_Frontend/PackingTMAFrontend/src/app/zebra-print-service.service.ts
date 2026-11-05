import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ZebraPrintServiceService {
  private baseUrl = `${environment.apiUrl}/print`;


  constructor(private http: HttpClient) { }

    printLabel(zplCommand: string): Observable<string> {
      const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
      return this.http.post(`${this.baseUrl}/label`, zplCommand, { headers, responseType: 'text' });
    }

    getAvailablePrinters(): Observable<any>{
      return this.http.get(`${this.baseUrl}/fetchAllConnectedPrinters`);
    }
    // checkPrinterConnection(): Observable<boolean> {
    //   return this.http.get<boolean>(`${this.baseUrl}/check-printer`);
    // }
}
