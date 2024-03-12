import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { LandingComponent } from "../landing/landing.component";
import { FeaturesComponent } from "../features/features.component";
import { DescriptionComponent } from "../description/description.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [NavbarComponent, FooterComponent, LandingComponent, FeaturesComponent, DescriptionComponent]
})
export class HomeComponent {

}
