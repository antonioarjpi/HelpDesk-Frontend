import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { Called } from '../models/called';

@Injectable({
  providedIn: 'root'
})
export class CalledService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Called[]>{
    return this.http.get<Called[]>(`${API_CONFIG.baseUrl}/calleds`)
  }

  findById(id: any): Observable<Called>{
    return this.http.get<Called>(`${API_CONFIG.baseUrl}/calleds/${id}`)
  }

  create(called: Called): Observable<Called> {
    return this.http.post<Called>(`${API_CONFIG.baseUrl}/calleds`, called)
  }

  update(called: Called): Observable<Called> {
    return this.http.put<Called>(`${API_CONFIG.baseUrl}/calleds/${called.id}`, called)
  }

  delete(id: any): Observable<Called>{
    return this.http.delete<Called>(`${API_CONFIG.baseUrl}/calleds/${id}`)
  }
}
