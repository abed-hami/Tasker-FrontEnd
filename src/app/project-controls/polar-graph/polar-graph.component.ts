import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { TaskService } from '../../services/task.service';
import { CookiesService } from '../../services/cookies.service';
@Component({
  selector: 'app-polar-graph',
  standalone: true,
  imports: [CommonModule,ChartModule],
  templateUrl: './polar-graph.component.html',
  styleUrl: './polar-graph.component.css'
})
export class PolarGraphComponent {


  constructor(private taskService:TaskService,private cookie:CookiesService){}

  data: any;
  testing:any
  pending:any
  inprogress:any
  onhold:any
  projectId:any
  memberId:any

  getProjectTaskCount(id:any,status:any,memberId:any){
    this.taskService.getProjectCountByStatus(id,status,memberId).subscribe((data)=>{
      if(status=="testing"){
        this.testing=data
        console.log("testing "+this.testing)
      }
      if(status=="in-progress"){
        this.inprogress=data
      }
      if(status=="on-hold"){
        this.onhold=data
      }
      if(status=="pending"){
        this.pending=data
      }

      this.updateGraph()
    })
  }

    options: any;

    ngOnInit() {
      this.memberId= this.cookie.getCookieId()
      this.projectId=localStorage.getItem("projectId")

      if(localStorage.getItem("position")=="manager"){
        this.getProjectTaskCount(this.projectId,"testing",0)
        this.getProjectTaskCount(this.projectId,"pending",0)
        this.getProjectTaskCount(this.projectId,"on-hold",0)
        this.getProjectTaskCount(this.projectId,"in-progress",0)

      }

      if(localStorage.getItem("position")!="manager"){
        this.getProjectTaskCount(this.projectId,"testing",this.memberId)
        this.getProjectTaskCount(this.projectId,"pending",this.memberId)
        this.getProjectTaskCount(this.projectId,"on-hold",this.memberId)
        this.getProjectTaskCount(this.projectId,"in-progress",this.memberId)

      }


    }

    updateGraph(){
      const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.data = {
            datasets: [
                {
                    data: [this.pending, this.inprogress, this.onhold, this.testing],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--gray-500'),
                        documentStyle.getPropertyValue('--blue-500'),
                        documentStyle.getPropertyValue('--yellow-500'),

                        documentStyle.getPropertyValue('--purple-500')
                    ],
                    label: 'My dataset'
                }
            ],
            labels: ['pending', 'in-progress', 'on-hold',  'testing']
        };

        this.options = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                        size:1,
                        font:{
                          size: 10,
                        }
                    },
                    position: 'right',

                }
            },
            scales: {
                r: {
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };
    }

}
