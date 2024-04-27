import { Component } from '@angular/core';
import { ProjectCardsComponent } from "../project-cards/project-cards.component";
import { PolarGraphComponent } from "../polar-graph/polar-graph.component";
import { PriorityPieComponent } from "../../home-controls/priority-pie/priority-pie.component";
import { RemindersComponent } from "../../home-controls/reminders/reminders.component";
import { PieComponent } from "../pie/pie.component";
import { WorkloadComponent } from "../workload/workload.component";

@Component({
    selector: 'app-project-dash',
    standalone: true,
    templateUrl: './project-dash.component.html',
    styleUrl: './project-dash.component.css',
    imports: [ProjectCardsComponent, PolarGraphComponent, PriorityPieComponent, RemindersComponent, PieComponent, WorkloadComponent]
})
export class ProjectDashComponent {

  position:any

  ngOnInit(){
    this.position=localStorage.getItem('position')
  }

}
