import { Component, OnChanges, OnInit } from '@angular/core';
import { getRandomDate, getRandomInt } from 'src/shared/dataGeneration';
import { ICourse } from 'src/shared/interfaces';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit, OnChanges {

  searchInputValue: string = '';
  searchValue: string = '';
  courses: ICourse[] = [];

  constructor() { }

  onSearchButtonClick(): void {
    this.searchValue = this.searchInputValue;
  }

  ngOnInit(): void {
    setTimeout(() => {
      Array(10).fill(null).forEach((_, i) => {
        this.courses.push({
          id: i,
          title: `${i} title`,
          creation_date: getRandomDate(new Date(2021, 11, 1), new Date(2022, 3, 1)).toISOString(),
          duration: getRandomInt(10, 400),
          description: `${i} description`,
          topRated: Math.random() > .5,
        })
      })
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
