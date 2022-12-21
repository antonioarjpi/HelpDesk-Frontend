import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { Called } from '../models/called';
import { CalledCreate } from 'src/app/models/called';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  sheetCalleds(): Observable<Blob>{
    return this.http.get(`${API_CONFIG.baseUrl}/sheets/calleds`, {
      responseType: 'blob'
    })
  }
}
