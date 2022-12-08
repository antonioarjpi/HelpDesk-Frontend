import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Client[]>{
    return this.http.get<Client[]>(`${API_CONFIG.baseUrl}/clients`)
  }

  findById(id: any): Observable<Client>{
    return this.http.get<Client>(`${API_CONFIG.baseUrl}/clients/${id}`)
  }

  create(client: Client): Observable<Client> {
    return this.http.post<Client>(`${API_CONFIG.baseUrl}/clients`, client)
  }

  update(client: Client): Observable<Client> {
    return this.http.put<Client>(`${API_CONFIG.baseUrl}/clients/${client.id}`, client)
  }

  delete(id: any): Observable<Client>{
    return this.http.delete<Client>(`${API_CONFIG.baseUrl}/clients/${id}`)
  }
}
