import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TagModule } from 'primeng/tag';
import { ClockComponent } from "../clock/clock.component";
import { ProgressBarModule } from 'primeng/progressbar';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-tasks',
    standalone: true,
    templateUrl: './tasks.component.html',
    styleUrl: './tasks.component.css',
    imports: [RouterModule]
})
export class TasksComponent {


}
