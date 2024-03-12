import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./home/navbar/navbar.component";

import { LandingComponent } from "./home/landing/landing.component";
import { HomeComponent } from "./home/home/home.component";
import { LoginComponent } from "./home/login/login.component";
import { SignupComponent } from "./home/signup/signup.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, NavbarComponent, LandingComponent, HomeComponent, LoginComponent, SignupComponent]
})
export class AppComponent {
  title = 'Tasker';
}
