import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IUser } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userInfo: null | IUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
  isAuthenticated = !!this.userInfo;
  isAuthenticated$: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  login() {
    console.log('login called');

    const fakeUser = {
      id: 0,
      username: 'testuser',
      first_name: 'aaa',
      last_name: 'bbb',
    }
    this.userInfo = fakeUser;
    this.isAuthenticated = true;
    this.isAuthenticated$.next(this.isAuthenticated);
    localStorage.setItem('user', JSON.stringify(this.userInfo));
  }

  logout() {
    this.userInfo = null;
    this.isAuthenticated = false;
    this.isAuthenticated$.next(this.isAuthenticated);
    localStorage.removeItem('user');
  }

  getUserInfo() {
    return this.userInfo;
  }
}
