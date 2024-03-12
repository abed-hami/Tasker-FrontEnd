import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './home/login/login.component';
import { SignupComponent } from './home/signup/signup.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent}
];
