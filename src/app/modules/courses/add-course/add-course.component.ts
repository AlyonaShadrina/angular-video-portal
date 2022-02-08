import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICourse } from 'src/shared/interfaces';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  formValues: Omit<ICourse, 'id' | 'topRated'> = {
    title: '',
    creation_date: '',
    duration: 0,
    description: '',
  };

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const course = this.apiService.getCourseById(params['id']);
      if (course) {
        this.formValues = course;
      }
    });
  }

  onFormSubmit() {
    console.log('formValues', this.formValues);
  }

}
