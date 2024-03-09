import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  base_url = "http://localhost:5000"
  isAuthenticated:boolean = false;


  constructor(
    private http:HttpClient
  ) {
    /**
     * check if token exist in local storage
     */
    const token = localStorage.getItem('token')
    if(token)
    /**
     * if token exist it means user is authenticated!
     */
      this.isAuthenticated = true;
  }

  getAuth = () => {
    return this.isAuthenticated;
  }

  setAuth = (newAuth:boolean) => {
    this.isAuthenticated = newAuth
  }

  authenticateUser = (data:any) => {
    return this.http.post(`${this.base_url}/auth/login`,data)
  }

}
