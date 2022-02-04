import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DurationPipe } from 'src/app/pipes/duration.pipe';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { OrderByPipe } from 'src/app/pipes/order-by.pipe';
import { HighlightDateBasedDirective } from 'src/app/directives/highlight-date-based.directive';
import { ModalComponent } from 'src/app/modal/modal.component';

import { CoursesPageComponent } from './courses-page/courses-page.component';
import { CourseListItemComponent } from './course-list-item/course-list-item.component';
import { ApiService } from './services/api.service';



@NgModule({
  declarations: [
    CoursesPageComponent,
    CourseListItemComponent,
    ModalComponent,

    HighlightDateBasedDirective,

    DurationPipe,
    FilterPipe,
    OrderByPipe,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [CoursesPageComponent],
  providers: [ApiService],
})
export class CoursesModule { }
