import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './home/login/login.component';
import { SignupComponent } from './home/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

import { CalendarComponent } from './controls/calendar/calendar.component';
import { TasksComponent } from './controls/tasks/tasks.component';
import { TodoComponent } from './controls/todo/todo.component';
import { ProfileComponent } from './controls/profile/profile.component';
import { ProjectsComponent } from './controls/projects/projects.component';
import { ProjectsListComponent } from './controls/projects-list/projects-list.component';
import { TasksListComponent } from './controls/tasks-list/tasks-list.component';

import { ProjectViewComponent } from './project-controls/project-view/project-view.component';
import { HomedashComponent } from './controls/homedash/homedash.component';
import { RequestsComponent } from './controls/requests/requests.component';
import { Component } from '@angular/core';
import { RequestsListComponent } from './controls/requests-list/requests-list.component';
import { MemberPageComponent } from './project-controls/member-page/member-page.component';
import { ProjectRequestsComponent } from './project-controls/project-requests/project-requests.component';

import { TimelineComponent } from './project-controls/timeline/timeline.component';
import { ProjectTasksComponent } from './project-controls/project-tasks/project-tasks.component';
import { AnnouncementsComponent } from './project-controls/announcements/announcements.component';
import { ProjectDashComponent } from './project-controls/project-dash/project-dash.component';
import { ProjectDetailsComponent } from './project-controls/project-details/project-details.component';
import { authGuard } from './guard/auth.guard';


export const routes: Routes = [
  { path: '', component: HomeComponent, },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'dashboard', component: DashboardComponent,canActivate:[authGuard], children: [
      { path: '', component: HomedashComponent },
      { path: 'calendar', component: CalendarComponent },
      {
        path: 'tasks', component: TasksComponent, children: [
          { path: '', component: TasksListComponent },

        ]
      },
      {path:'request',component:RequestsComponent,
        children:[{path:'',component:RequestsListComponent}]
    },
      { path: 'todo', component: TodoComponent },
      { path: 'profile', component: ProfileComponent },
      {
        path: 'projects', component: ProjectsComponent,
        children: [
          { path: '', component: ProjectsListComponent },
          { path: 'view', component: ProjectViewComponent,
        children:[
          {path:'projectDashboard',component:ProjectDashComponent},
          {path:'members',component:MemberPageComponent},
          {path:'projectTasks',component:ProjectTasksComponent},
          {path:'timeline',component:TimelineComponent},
          {path:'announcements',component:AnnouncementsComponent},
          {path:'details',component:ProjectDetailsComponent},
        ] }

        ]
      }
    ]
  }

];
