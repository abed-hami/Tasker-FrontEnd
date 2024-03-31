import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CookiesService } from '../../services/cookies.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-dashcards',
  standalone: true,
  imports: [],
  templateUrl: './dashcards.component.html',
  styleUrl: './dashcards.component.css'
})
export class DashcardsComponent {
  constructor(private taskService:TaskService,private cookie:CookiesService, private projectService:ProjectService){}

  tasksCount:any
  projectsCount:any
  doneTasks:any
  id:any
  managedProjects:any

  ngOnInit(){
    this.id=this.cookie.getCookieId()
    this.getTaskCount(this.id)
    this.getProjectCount(this.id)
    this.getDoneTasks(this.id)
    this.getManagedProjects(this.id)
  }

  getTaskCount(memberId:any){
    this.taskService.getCountByPriority(memberId,"null").subscribe(
      (data)=>{
        this.tasksCount=data
      }
    )
  }

  getDoneTasks(memeberId:any){
    this.taskService.getCountByStatus(memeberId,"completed").subscribe(
      (data)=>{
        this.doneTasks=data
      }
    )
  }

  getProjectCount(memberId:any){
    this.projectService.getCount(memberId,"null").subscribe(
      (data)=>{
        this.projectsCount=data
      }
    )
  }

  getManagedProjects(memberId:any){
    this.projectService.getCount(memberId,"manager").subscribe(
      (data)=>{
        this.managedProjects=data
      }
    )
  }

}
