import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { TaskService } from '../../services/task.service';
@Component({
  selector: 'app-workload',
  standalone: true,
  imports: [ChartModule,CommonModule],
  templateUrl: './workload.component.html',
  styleUrl: './workload.component.css'
})
export class WorkloadComponent {

  constructor(private taskService: TaskService){}
  data: any;

  options: any;
  members:any=[]
  done:any=[]
  pending:any=[]
  budget:any=[]


  getWorkload(projectId:any){
    this.taskService.getWorkload(projectId).subscribe(
      (data:any)=>{
        data.forEach((item: { memberName: any; completedTaskCount: any; totalBudget: any; taskCount: any; }) => {
          this.members.push(item.memberName);
          this.done.push(item.completedTaskCount);
          this.budget.push(item.totalBudget);
          this.pending.push(item.taskCount);
        });
        this.getChart()

      }
    )
  }

  ngOnInit() {
    this.getWorkload(localStorage.getItem("projectId"))
  }

  getChart(){
    const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.data = {
          labels: this.members,
          datasets: [
              {
                  type: 'line',
                  label: 'Budget',
                  borderColor: documentStyle.getPropertyValue('--blue-500'),
                  borderWidth: 2,
                  fill: false,
                  tension: 0.4,
                  data: this.budget
              },
              {
                  type: 'bar',
                  label: 'Pending',
                  backgroundColor: documentStyle.getPropertyValue('--green-500'),
                  data: this.pending,
                  borderColor: 'white',
                  borderWidth: 2
              },
              {
                  type: 'bar',
                  label: 'Done',
                  backgroundColor: documentStyle.getPropertyValue('--orange-500'),
                  data: this.done
              }
          ]
      };

      this.options = {
          maintainAspectRatio: false,
          aspectRatio: 0.6,
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
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder
                  }
              },
              y: {
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder
                  }
              }
          }
      };
  }
}
