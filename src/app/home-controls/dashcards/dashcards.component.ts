import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CookiesService } from '../../services/cookies.service';
import { ProjectService } from '../../services/project.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-dashcards',
  standalone: true,
  imports: [],
  templateUrl: './dashcards.component.html',
  styleUrl: './dashcards.component.css'
})
export class DashcardsComponent {
  constructor(private taskService:TaskService,private cookie:CookiesService, private projectService:ProjectService, private loginService:LoginService){}

  tasksCount:any
  projectsCount:any
  doneTasks:any
  id:any
  managedProjects:any

  ngOnInit(){

    this.getUserInfo(localStorage.getItem("myToken"))
  }


  async getUserInfo(mytoken:any) {
    return new Promise<void>((resolve, reject) => {
      this.loginService.getUserInfo().subscribe(
        (data: any) => {
          this.id = data.id;
          this.get(this.id)
          resolve();
        },
        error => {
          reject(error); }
      );
    });
  }

  getTaskCount(memberId:any){
    return new Promise((resolve, reject) => {
      this.taskService.getCountByPriority(memberId, "null").subscribe(
        (data) => {
          this.tasksCount = data;
          resolve(true);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  get(id:any){

    this.getTaskCount(id)
    this.getProjectCount(id)
    this.getDoneTasks(id)
    this.getManagedProjects(id)

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
