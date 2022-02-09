import { Component, OnInit } from '@angular/core';
import { debounce, distinctUntilChanged, Subject, timer } from 'rxjs';

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

  // for storing all required query params (filtering, pagination...)
  queryParams: Record<string, string | number> = {
    _page: 1,
    _limit: 5,
  };
  // updating queryParams should happen through helper to automatically trigger request
  queryParamsUpdateHelper$ = new Subject();
  // we use observable for debouncing instead of directly using queryParamsUpdateHelper$
  search$ = new Subject();

  constructor(private apiServise: ApiService) { }

  getCourses(): void {
    this.apiServise.getCoursesList({ queryObject: this.queryParams as Record<string, string> }).subscribe((response) => {
      this.courses = response;
    });
  }

  onSearchInputKeyup(event: any): void {
    this.search$.next(event.target?.value);
  }
  goToNextPage(): void {
    this.queryParamsUpdateHelper$.next({ _page: ++(this.queryParams['_page'] as number) });
  }
  goToPrevPage(): void {
    this.queryParamsUpdateHelper$.next({ _page: --(this.queryParams['_page'] as number) });
  }

  ngOnInit(): void {
    this.getCourses();

    this.search$.pipe(
      debounce(() => timer(500)),
      distinctUntilChanged(),
    ).subscribe((searchValue) => {
      this.queryParamsUpdateHelper$.next({ title_like: searchValue as string, _page: 1, });
    })

    this.queryParamsUpdateHelper$.subscribe((v) => {
      this.queryParams = { ...this.queryParams, ...(v as  Record<string, string>) }
      this.getCourses()
    })
  }

  deleteCourse(courseId: ICourse['id']): void {
    this.apiServise.deleteCourse(courseId).subscribe({
      next: () => {
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
