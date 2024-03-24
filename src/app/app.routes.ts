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
import { MemberPageComponent } from './controls/member-page/member-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  { path: 'dashboard', component: DashboardComponent, children: [
    {path: '', component: MemberPageComponent},
    {path: 'calendar', component: CalendarComponent },
    {path:'tasks',component:TasksComponent,children:[
      {path:'',component:TasksListComponent}
    ]},
    {path:'todo',component:TodoComponent},
    {path:'profile',component:ProfileComponent},
    {path:'projects',component:ProjectsComponent,
      children:[
        {path:'',component:ProjectsListComponent},
      ]
  }
  ]
}

];
