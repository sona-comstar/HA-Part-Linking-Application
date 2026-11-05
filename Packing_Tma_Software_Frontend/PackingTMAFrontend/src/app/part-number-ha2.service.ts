import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface PartNumber {
  ha01s4: string;
  ha01s5: string;
  ha0102: string;
}

@Injectable({
  providedIn: 'root'
})
export class PartNumberHA2Service {

   private baseUrl = `${environment.apiUrl}/part-numbersHA2`;
  
  
    constructor(private http: HttpClient, private messageService: MessageService) { }
  
    savePart(part: PartNumber): Observable<any> {
      return this.http.post(`${this.baseUrl}/save`, part);
    }
  
    checkDuplicate(field: string, value: string): Observable<boolean> {
      return this.http.get<boolean>(`${this.baseUrl}/check-duplicate?field=${field}&value=${value}`);
    }
  
    getCountToday(): Observable<number> {
      return this.http.get<number>(`${this.baseUrl}/count`);
    }
  
    showSuccess(message: string) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: message,
        life: 3000
      });
    }
  
    showError(message: string) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: message,
        life: 3000
      });
    }
}
