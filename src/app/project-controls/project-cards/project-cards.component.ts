import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';

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

  constructor(private taskService:TaskService,private projectService:ProjectService){}

  getProjectById(id:any){
    this.projectService.getProject(id).subscribe(
      (data)=>{
        this.project=data
        this.change = ((this.project.budget)/ (this.project.additionalBudget)*100).toFixed(2)
      }
    )
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
    this.getTaskCount(this.projectId)
    this.getProjectById(this.projectId)
  }

}
