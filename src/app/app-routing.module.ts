import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { LoginPageComponent } from './modules/auth/login-page/login-page.component';
import { AddCourseComponent } from './modules/courses/add-course/add-course.component';
import { CoursesPageComponent } from './modules/courses/courses-page/courses-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  { path: 'courses', component: CoursesPageComponent, canActivate: [AuthGuard] },
  // TODO: maybe child routes should be used
  { path: 'courses/:id', component: AddCourseComponent, canActivate: [AuthGuard] },
  { path: 'courses/new', component: AddCourseComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginPageComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [AuthModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
