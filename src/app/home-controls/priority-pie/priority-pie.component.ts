import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ProjectService } from '../../services/project.service';
import { CookiesService } from '../../services/cookies.service';
import { TaskService } from '../../services/task.service';
@Component({
  selector: 'app-priority-pie',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './priority-pie.component.html',
  styleUrl: './priority-pie.component.css'
})
export class PriorityPieComponent {

  constructor(private taskService: TaskService, private cookie: CookiesService) { }

  id: any;
  high: any;
  low: any;
  medium: any;

  data: any;
  options: any;

  ngOnInit() {
    this.id = this.cookie.getCookieId();
    this.getCountByPriority(this.id, "high");
    this.getCountByPriority(this.id, "medium");
    this.getCountByPriority(this.id, "low");
  }

  getCountByPriority(id: any, priority: any) {
    this.taskService.getCountByPriority(id, priority).subscribe(
      (data: any) => {
        if (priority === "high") {
          this.high = data;
        } else if (priority === "medium") {
          this.medium = data;
        } else {
          this.low = data;
        }
        this.getChart();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: ['High', 'Medium', 'Low'],
      datasets: [
        {
          data: [this.high, this.medium, this.low],
          backgroundColor: [documentStyle.getPropertyValue('--red-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--red-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
        }
      ]
    };

    this.options = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor,
            
          }
        }
      }
    };
  }

}
