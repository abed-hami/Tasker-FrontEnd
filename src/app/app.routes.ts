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

export const routes: Routes = [
  { path: '', component: HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  { path: 'dashboard', component: DashboardComponent, children: [
    {path: 'calendar', component: CalendarComponent },
    {path:'',component:TasksComponent},
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
