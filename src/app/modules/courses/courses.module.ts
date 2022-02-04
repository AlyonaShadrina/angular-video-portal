import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesPageComponent } from './courses-page/courses-page.component';
import { CourseListItemComponent } from './course-list-item/course-list-item.component';
import { DurationPipe } from '../../pipes/duration.pipe';
import { FilterPipe } from '../../pipes/filter.pipe';
import { OrderByPipe } from '../../pipes/order-by.pipe';
import { FormsModule } from '@angular/forms';
import { HighlightDateBasedDirective } from '../../directives/highlight-date-based.directive';



@NgModule({
  declarations: [
    CoursesPageComponent,
    CourseListItemComponent,
    HighlightDateBasedDirective,
    DurationPipe,
    FilterPipe,
    OrderByPipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [CoursesPageComponent],
})
export class CoursesModule { }
