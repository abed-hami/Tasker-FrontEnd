import { Component } from '@angular/core';
import { LandingComponent } from "../landing/landing.component";

@Component({
    selector: 'app-features',
    standalone: true,
    templateUrl: './features.component.html',
    styleUrl: './features.component.css',
    imports: [LandingComponent]
})
export class FeaturesComponent {

}
