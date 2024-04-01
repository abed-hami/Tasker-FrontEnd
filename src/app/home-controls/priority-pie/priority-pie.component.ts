import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ProjectService } from '../../services/project.service';
import { CookiesService } from '../../services/cookies.service';
import { TaskService } from '../../services/task.service';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-priority-pie',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './priority-pie.component.html',
  styleUrl: './priority-pie.component.css'
})
export class PriorityPieComponent {
  high: any;
  medium: any;
  low: any;
  data: any;
  options: any;
  id:any

  constructor(private taskService: TaskService, private cookie: CookiesService,private loginService:LoginService) { }

  async getUserInfo(mytoken:any) {
    return new Promise<void>((resolve, reject) => {
      this.loginService.getUserInfo().subscribe(
        (data: any) => {
          this.id = data.id;
          this.getData(this.id)
          resolve();
        },
        error => {
          reject(error); }
      );
    });
  }

  ngOnInit() {
    this.getUserInfo(localStorage.getItem('myToken'))

  }

  getData(id:any){
    this.getCountByPriority(id, "high");
    this.getCountByPriority(id, "medium");
    this.getCountByPriority(id, "low");
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
        this.renderChart();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  renderChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: ['High', 'Medium', 'Low'],
      datasets: [
        {
          data: [this.high, this.medium, this.low],
          backgroundColor: [
            '#FF5740',
            '#FFC140',
            '#6BFF40'
          ],
          hoverBackgroundColor: ['#FF5540',
          '#FFC040',
          '#6BFA40']
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
