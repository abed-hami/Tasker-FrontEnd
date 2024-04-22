import { Component } from '@angular/core';
import { ProjectCardsComponent } from "../project-cards/project-cards.component";

@Component({
    selector: 'app-project-dash',
    standalone: true,
    templateUrl: './project-dash.component.html',
    styleUrl: './project-dash.component.css',
    imports: [ProjectCardsComponent]
})
export class ProjectDashComponent {

}
