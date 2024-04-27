import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { TaskService } from '../../services/task.service';
import { CookiesService } from '../../services/cookies.service';
@Component({
  selector: 'app-pie',
  standalone: true,
  imports: [ChartModule,CommonModule],
  templateUrl: './pie.component.html',
  styleUrl: './pie.component.css'
})
export class PieComponent {
  data: any;

    options: any;
    done:any
    pending:any
    overdue:any
    projectId:any
    memberId:any

    constructor(private taskService:TaskService,private cookie:CookiesService){}

    getProjectTaskCount(id:any,status:any,memberId:any){
      this.taskService.getProjectCountByStatus(id,status,memberId).subscribe((data)=>{
        if(status=="completed"){
          this.done=data

        }
        if(status=="null"){
          this.pending=data
        }

        if(status=="overdue"){
          this.overdue=data
        }


        this.updateGraph()
      })
    }

    updateGraph(){

      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      this.data = {
          labels: ['Done', 'Pending', 'Overdue'],
          datasets: [
              {
                  data: [this.done, this.pending, this.overdue],
                  backgroundColor: [documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--red-500')],
                  hoverBackgroundColor: [documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--red-400')]
              }
          ]
      };

      this.options = {
          plugins: {
              legend: {
                  labels: {
                      usePointStyle: true,
                      color: textColor,
                      position:'right'
                  }
              }
          }
      };
    }


    ngOnInit() {
      this.memberId=this.cookie.getCookieId()
      this.projectId=localStorage.getItem("projectId")

      if(localStorage.getItem("position")=="manager"){
        this.getProjectTaskCount(this.projectId,"overdue",0)
      this.getProjectTaskCount(this.projectId,"completed",0)
      this.getProjectTaskCount(this.projectId,"null",0)
      }

      if(localStorage.getItem("position")!="manager"){
        this.getProjectTaskCount(this.projectId,"overdue",this.memberId)
      this.getProjectTaskCount(this.projectId,"completed",this.memberId)
      this.getProjectTaskCount(this.projectId,"null",this.memberId)
      }





    }
}
