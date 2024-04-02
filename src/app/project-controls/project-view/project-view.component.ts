import { Component } from '@angular/core';
import { DockComponent } from "../dock/dock.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-project-view',
    standalone: true,
    templateUrl: './project-view.component.html',
    styleUrl: './project-view.component.css',
    imports: [DockComponent, RouterModule]
})
export class ProjectViewComponent {

  

}
