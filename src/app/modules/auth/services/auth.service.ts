import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import jwtDecode from "jwt-decode";


import { IUser } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlUsers = 'http://localhost:3000/users';
  private urlLogin = 'http://localhost:3000/login';

  userInfo: null | IUser = null;
  userToken: string | null = localStorage.getItem('userToken');
  isAuthenticated = !!this.userToken;
  isAuthenticated$: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router, private http: HttpClient) { }

  login(data: Pick<IUser, 'email' | 'password'>) {
    const requestResult = this.http.post<{ accessToken: string; }>(this.urlLogin, data);

    requestResult.subscribe((response) => {
      this.isAuthenticated = true;
      this.isAuthenticated$.next(this.isAuthenticated);
      this.userToken = response.accessToken
      localStorage.setItem('userToken', this.userToken);
      this.router.navigate(['/courses'])
    })

  }

  logout() {
    this.userInfo = null;
    this.isAuthenticated = false;
    this.isAuthenticated$.next(this.isAuthenticated);
    this.userToken = null;
    localStorage.removeItem('userToken');
    this.router.navigate(['/login'])
  }

  getUserInfo() {
    if (!this.userToken) {
      throw new Error("AuthService: no userToken");
    }
    const requestResult = this.http.get<IUser>(`${this.urlUsers}/${jwtDecode(this.userToken)}`);
    requestResult.subscribe((response) => {
      this.userInfo = response;
    })
    return requestResult;
  }
}
