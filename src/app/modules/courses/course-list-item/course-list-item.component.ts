import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ICourse } from 'src/shared/interfaces';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.scss']
})
export class CourseListItemComponent implements OnInit, OnChanges {

  @Input() course!: ICourse;
  @Input() odd?: boolean;

  constructor() {
    console.log('constructor', this.course);
  }

  ngOnInit(): void {
    console.log('ngOnInit', this.course);
  }
  ngOnChanges(): void {
    console.log('app-course-list-item ngOnChanges', this.course);
  }

  @Output() deleteCourse = new EventEmitter<ICourse['id']>()

  onCourseDelete() {
    console.log('onCourseDelete');
    this.deleteCourse.emit(this.course.id);
  }

}
