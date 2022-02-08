import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ICourse } from 'src/shared/interfaces';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  formValues: Omit<ICourse, 'id' | 'is_top_rated'> | ICourse = {
    title: '',
    creation_date: '',
    duration: 0,
    description: '',
  };

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.apiService.getCourseById(params['id']).subscribe(response => {
        if (response) {
          this.formValues = response;
        }
      });

    });
  }

  onFormSubmit() {
    if ((this.formValues as ICourse).id) {
      this.apiService.updateCourse((this.formValues as ICourse).id, this.formValues).subscribe(response => {
        this.formValues = response;
      });
    } else {
      this.apiService.postCourse(this.formValues).subscribe(response => {
        this.formValues = response;
      });
    }
    // this.router.navigate(['/courses'])
  }

}
