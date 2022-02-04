import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ICourse } from 'src/shared/interfaces';

import { CourseListItemComponent } from './course-list-item.component';

describe('CourseListItemComponent', () => {
  let component: CourseListItemComponent;
  let fixture: ComponentFixture<CourseListItemComponent>;

  const mockCourse = {
    id: 5,
    title: `${5} title`,
    creation_date: `${Date.now() + 5}`,
    duration: 5 * Math.random(),
    description: `${5} description`,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListItemComponent);
    component = fixture.componentInstance;
    component.course = mockCourse;
    fixture.detectChanges();
  });

  it('click on delete calls deleteCourse', () => {
    let selectedCourseId: ICourse['id'] | undefined;
    component.deleteCourse.pipe().subscribe((courseId: ICourse['id']) => selectedCourseId = courseId);

    fixture.debugElement.query(By.css('.delete')).triggerEventHandler('click', null);
    expect(selectedCourseId).toBe(mockCourse.id);
  });
});
