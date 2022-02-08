import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ICourse } from 'src/shared/interfaces';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
})
export class CoursesPageComponent implements OnInit {

  searchInputValue: string = '';
  courses: ICourse[] = [];

  // updating queryParams should happen through helper to automatically trigger request
  queryParamsUpdateHelper$ = new BehaviorSubject<Record<string, string | number>>({});
  // for storing all required query params (filtering, pagination...)
  queryParams: Record<string, string | number> = {
    _page: 1,
    _limit: 5,
  };

  constructor(private apiServise: ApiService) {
    this.queryParamsUpdateHelper$.subscribe(v => {
      this.queryParams = { ...this.queryParams, ...v }
      this.getCourses()
    })
  }

  getCourses(): void {
    this.apiServise.getCoursesList({ queryObject: this.queryParams as Record<string, string> }).subscribe((response) => {
      this.courses = response;
    });
  }

  onSearchButtonClick(): void {
    this.queryParamsUpdateHelper$.next({ title_like: this.searchInputValue });
  }
  goToNextPage(): void {
    this.queryParamsUpdateHelper$.next({ _page: ++(this.queryParams['_page'] as number) });
  }
  goToPrevPage(): void {
    this.queryParamsUpdateHelper$.next({ _page: --(this.queryParams['_page'] as number) });
  }

  ngOnInit(): void {
    this.getCourses();
  }

  deleteCourse(courseId: ICourse['id']): void {
    this.apiServise.deleteCourse(courseId).subscribe({
      next: () => {
        // this.courses = this.courses.filter(course => course.id !== courseId);
        this.getCourses();
      },
      error: () => {
        console.error('deleteCourse');
      }
    });
  }

  trackCourseById(_: number, course: ICourse): ICourse['id'] {
    return course.id;
  }

  transformFieldValueForOrder(course: ICourse, fieldName: keyof ICourse) {
    if (fieldName === 'creation_date') {
      return new Date(course.creation_date).getTime();
    }
    return course[fieldName]
  }
}
