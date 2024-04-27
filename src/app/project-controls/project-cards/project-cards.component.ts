import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';
import { CookiesService } from '../../services/cookies.service';

@Component({
  selector: 'app-project-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-cards.component.html',
  styleUrl: './project-cards.component.css'
})
export class ProjectCardsComponent {

  taskCount:any
  projectId:any
  project:any
  change:any
  position:any
  memberTaskCount:any
  memberId:any

  constructor(private taskService:TaskService,private projectService:ProjectService,private cookie:CookiesService){}

  getProjectById(id:any){
    this.projectService.getProject(id).subscribe(
      (data)=>{
        this.project=data
        this.change = ((this.project.budget)/ (this.project.additionalBudget)*100).toFixed(2)
      }
    )
  }

  getMemberProjectTaskCount(projectId:any,memberId:any){
    this.taskService.getProjectMemberCount(projectId,memberId).subscribe((count)=>this.memberTaskCount=count)
  }

  getTaskCount(id:any){
    this.taskService.getProjectTaskCount(id).subscribe(
      (data)=>{
        this.taskCount= data;
      }
    )
  }

  ngOnInit(){
    this.projectId= localStorage.getItem("projectId")
    this.memberId= this.cookie.getCookieId()
    this.getTaskCount(this.projectId)
    this.getProjectById(this.projectId)
    this.position=localStorage.getItem('position')
    this.getMemberProjectTaskCount(this.projectId,this.memberId)
  }

}
