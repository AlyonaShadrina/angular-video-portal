import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  isOpened = false;

  close() {
    this.isOpened = false;
  }
  open() {
    this.isOpened = true;
  }
}
