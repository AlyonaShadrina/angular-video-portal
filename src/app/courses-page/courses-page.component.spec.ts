import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { CoursesPageComponent } from './courses-page.component';

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [ CoursesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPageComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should fill courses array with 10 values', () => {
    expect(component.courses).toEqual([]);
    fixture.detectChanges();
    expect(component.courses.length).toEqual(10);
  });

  it('onSearchButtonClick should call console.log', () => {
    const spy = spyOn(console, 'log');
    component.onSearchButtonClick();
    expect(spy).toHaveBeenCalledWith('searchValue', '')
  });

  it('deleteCourse should update courses array', () => {
    fixture.detectChanges();
    expect(component.courses.length).toEqual(10);
    component.deleteCourse(1);
    expect(component.courses.length).toEqual(9);
  });

  it('trackCourseById should return course id', () => {
    const result = component.trackCourseById(1, {
      id: 1,
      title: `${1} title`,
      creation_date: `${Date.now() + 1}`,
      duration: 1 * Math.random(),
      description: `${1} description`,
    });

    expect(result).toBe(1);
  });

  it('changing input updates searchValue', () => {
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = '123';
    input.dispatchEvent(new Event('input'));

    expect(component.searchValue).toBe('123');
  });
  it('click on button calls onSearchButtonClick', () => {
    fixture.detectChanges();
    const spy = spyOn(component, 'onSearchButtonClick');
    expect(spy).toHaveBeenCalledTimes(0);
    const input = fixture.debugElement.query(By.css('button')).nativeElement;
    input.dispatchEvent(new Event('click'));

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
