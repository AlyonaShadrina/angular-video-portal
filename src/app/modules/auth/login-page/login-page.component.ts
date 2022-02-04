import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {

  constructor(private authService: AuthService) { }

  onSubmit(f: NgForm) {
    console.log(f.value);
    this.authService.login();
  }

}
