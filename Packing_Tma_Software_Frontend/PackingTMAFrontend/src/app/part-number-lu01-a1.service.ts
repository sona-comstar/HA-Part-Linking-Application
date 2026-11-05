import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment} from "../environments/environment";
import { MessageService } from 'primeng/api';

interface PartNumber {
  lu0101: string;
}

@Injectable({
  providedIn: 'root'
})
export class PartNumberLU01A1Service {

  private baseUrl = `${environment.apiUrl}/part-numbersLU0101`;


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
