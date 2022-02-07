import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ICourse } from 'src/shared/interfaces';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.scss'],
  providers: [ModalService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListItemComponent implements OnInit, OnChanges {

  @Input() course!: ICourse;
  @Input() odd?: boolean;

  constructor(public deleteModal: ModalService) {
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
    this.deleteModal.close()
  }

}
