import { Injectable } from '@angular/core';

import { getRandomDate, getRandomInt } from 'src/shared/dataGeneration';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( ) { }

  getCoursesList() {
    const result = Array(10).fill(null).map((_, i) => ({
      id: i,
      title: `${i} title`,
      creation_date: getRandomDate(new Date(2021, 11, 1), new Date(2022, 3, 1)).toISOString(),
      duration: getRandomInt(10, 400),
      description: `${i} description`,
      topRated: Math.random() > .5,
    }))
    return result;
  }

  postCourse() {

  }

  getCourseById() {

  }

  updateCourse() {

  }

  deleteCourse() {

  }
}
