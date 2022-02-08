import { Injectable } from '@angular/core';

import { getRandomDate, getRandomInt } from 'src/shared/dataGeneration';
import { ICourse } from 'src/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( ) { }

  private _coursesList: ICourse[] = [];

  getCoursesList() {
    this._coursesList = Array(10).fill(null).map((_, i) => ({
      id: i,
      title: `${i} title`,
      creation_date: getRandomDate(new Date(2021, 11, 1), new Date(2022, 3, 1)).toISOString(),
      duration: getRandomInt(10, 400),
      description: `${i} description`,
      topRated: Math.random() > .5,
    }))
    return this._coursesList;
  }

  postCourse() {

  }

  getCourseById(id: ICourse['id'] | string) {
    if (!this._coursesList.length) {
      this.getCoursesList()
    }
    const result = this._coursesList.find(course => course.id == id);
    return result;
  }

  updateCourse() {

  }

  deleteCourse() {

  }
}
