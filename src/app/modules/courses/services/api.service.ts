import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { getRandomDate, getRandomInt } from 'src/shared/dataGeneration';
import { ICourse } from 'src/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private _coursesList: ICourse[] = [];
  private urlCourses = 'http://localhost:3000/courses';

  getCoursesList(options?: { queryObject: string | URLSearchParams | string[][] | Record<string, string> | undefined }) {
    let queryString = options?.queryObject ? new URLSearchParams(options.queryObject).toString() : '';

    return this.http.get<ICourse[]>(`${this.urlCourses}?${queryString}`);
  }

  postCourse(data: Omit<ICourse, 'id' | 'is_top_rated'>) {
    return this.http.post<ICourse>(`${this.urlCourses}`, data);
  }

  getCourseById(id: ICourse['id'] | string) {
    return this.http.get<ICourse>(`${this.urlCourses}/${id}`);
  }

  updateCourse(id: ICourse['id'] | string, data: Partial<ICourse>) {
    return this.http.patch<ICourse>(`${this.urlCourses}/${id}`, data);
  }

  deleteCourse(id: ICourse['id']) {
    return this.http.delete<void>(`${this.urlCourses}/${id}`);
  }
}
