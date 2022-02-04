import { Component, OnChanges, OnInit } from '@angular/core';

import { ICourse } from 'src/shared/interfaces';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
})
export class CoursesPageComponent implements OnInit, OnChanges {

  searchInputValue: string = '';
  searchValue: string = '';
  courses: ICourse[] = [];

  constructor(private apiServise: ApiService) { }

  onSearchButtonClick(): void {
    this.searchValue = this.searchInputValue;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.courses = this.apiServise.getCoursesList();
    }, 2000)
  }
  ngOnChanges(): void {
    console.log('app-courses-page ngOnChanges');
  }

  deleteCourse(courseId: ICourse['id']): void {
    this.courses = this.courses.filter(course => course.id !== courseId)
  }

  trackCourseById(_: number, course: ICourse): ICourse['id'] {
    return course.id;
  }

  filterCourses(searchValue: string) {
    return function (course: ICourse): boolean {
      return !searchValue || course.title.includes(searchValue);
    }
  }

  transformFieldValueForOrder(course: ICourse, fieldName: keyof ICourse) {
    if (fieldName === 'creation_date') {
      return new Date(course.creation_date).getTime();
    }
    return course[fieldName]
  }
}
