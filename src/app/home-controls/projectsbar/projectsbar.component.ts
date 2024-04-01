import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ProjectService } from '../../services/project.service';
import { CookieService } from 'ngx-cookie-service';
import { CookiesService } from '../../services/cookies.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-projectsbar',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './projectsbar.component.html',
  styleUrl: './projectsbar.component.css'
})
export class ProjectsbarComponent {
  data: any;
  options: any;
  id:any

  constructor(private projectService: ProjectService, private cookie: CookiesService,private loginService:LoginService) {}

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

  getData(id:any){
    this.getCount(id)
  }



  getCount(id: any) {
    this.projectService.getProjectTasks(id).subscribe((tasksData: any) => {
      const labels = tasksData.map((task: any) => task.projectName);
      const completedTasksData = tasksData.map((task: any) => task.completedTasksCount);
      const pendingTasksData = tasksData.map((task: any) => task.pendingTasksCount);

      this.data = {
        labels: labels,
        datasets: [
          {
            label: 'Completed Tasks',
            backgroundColor: '#0047AB', // Royal Blue
            borderColor: '#1A237E',
            data: completedTasksData
          },
          {
            label: 'Pending Tasks',
            backgroundColor: '#89CFF0', // Dark Blue
            borderColor: '#003D7E',
            data: pendingTasksData
          }
        ]
      };
    });
  }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };

    this.getUserInfo(localStorage.getItem("myToken"))
  }
}
