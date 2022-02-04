import { Component, OnInit } from '@angular/core';
import { AuthService } from '../modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  userInfo = this.authService.getUserInfo();

  constructor(public authService: AuthService) { }

}
