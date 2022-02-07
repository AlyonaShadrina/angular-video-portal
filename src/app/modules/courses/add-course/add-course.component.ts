import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/shared/interfaces';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent {

  formValues: Omit<ICourse, 'id' | 'topRated'> = {
    title: '',
    creation_date: '',
    duration: 0,
    description: '',
  };

  constructor() { }

  onFormSubmit() {
    console.log('formValues', this.formValues);
  }

}
