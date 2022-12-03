import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { API_CONFIG } from "../config/api.config";
import { Credentials } from "./../models/credentials";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) {}

  authenticate(creds: Credentials) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
      observe: 'response',
      responseType: 'text'
    })
  }

  successLogin(authToken: string){
    localStorage.setItem('@HelpDesk_Token', authToken)
  }

  isAuthenticated() {
    let token = localStorage.getItem("@HelpDesk_Token")
    if (token != null){
      return !this.jwtService.isTokenExpired(token)
    }
    return false;
  }

  logout(){
    localStorage.clear();
  }
}
