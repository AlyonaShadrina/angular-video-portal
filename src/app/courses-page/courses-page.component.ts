import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent {

  searchValue: string = '';

  constructor() { }

  onSearchButtonClick(): void {
    console.log('searchValue', this.searchValue);
  }

}
