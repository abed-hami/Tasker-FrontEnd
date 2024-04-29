import { Component } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ToastService } from '../../services/toast.service';
import { projects } from '../../models/project';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent {

  constructor(private projectService:ProjectService, private toast:ToastService){}
  projectDetails:any
  projectId:any

  project:projects=new projects()
  getProjectDetails(id:any){
    this.projectService.getProject(id).subscribe(
      (data:any)=>{
        this.projectDetails=data
        console.log(data)
        this.project.id=id
        this.project.name=data.name
        this.project.additionalBudget=data.additionalBudget
        this.project.budget=data.budget
        this.project.endDate=data.endDate.split("T")[0]
        this.project.startDate=data.startDate.split("T")[0]
        this.project.category=data.category
        this.project.description=data.description
        this.project.memberId=data.memberId
        this.project.status=data.status
      },
    )
  }

  updateProject(){
    this.projectService.updateProject(this.project).subscribe(
      (data)=>{
        this.toast.showSuccess("Project Info Updated")
        this.getProjectDetails(this.projectId)
      },
      (error)=>{
        this.toast.showError("Spent budget greater than new budget")
        this.getProjectDetails(this.projectId)
      }
    )
  }

  status=""
  position:any


  ngOnInit(){
    this.projectId=localStorage.getItem('projectId')
    this.getProjectDetails(this.projectId)
    this.position= localStorage.getItem("position")

  }

  getStatus(position:any){
    if (position!="manager"){
      this.status="readonly"
    }
  }

}
