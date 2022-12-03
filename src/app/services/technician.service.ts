import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from './../config/api.config';
import { Observable } from 'rxjs';
import { Technician } from '../models/techinician';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Technician[]>{
    return this.http.get<Technician[]>(`${API_CONFIG.baseUrl}/technical`)
  }

  create(technician: Technician): Observable<Technician> {
    return this.http.post<Technician>(`${API_CONFIG.baseUrl}/technical`, technician)
  }
}
