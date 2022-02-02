import { Component, OnChanges, OnInit } from '@angular/core';
import { getRandomDate } from 'src/shared/dataGeneration';
import { ICourse } from 'src/shared/interfaces';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit, OnChanges {

  searchValue: string = '';
  courses: ICourse[] = [];

  constructor() { }

  onSearchButtonClick(): void {
    console.log('searchValue', this.searchValue);
  }

  ngOnInit(): void {
    setTimeout(() => {
      Array(10).fill(null).forEach((_, i) => {
        this.courses.push({
          id: i,
          title: `${i} title`,
          creation_date: getRandomDate(new Date(2021, 11, 1), new Date(2022, 3, 1)).toISOString(),
          duration: i * Math.random(),
          description: `${i} description`,
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

}
