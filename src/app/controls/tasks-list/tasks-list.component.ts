import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CommonModule,DialogModule,DividerModule],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent {
  visible1=false
  visible2=false

  id:any
  tasks:any
  colors:any=[]

  constructor(private taskService:TaskService, private loginService:LoginService){}




  ngOnInit(){

    this.getUserInfo()

  }

  

  getColor(priority:any){
    if(priority=='high'){return 'red'}
    else if(priority=='medium'){return 'yellow'}
    else{return 'green'}
  }

  getUserInfo(){
    this.loginService.getUserInfo().subscribe(
      (data:any)=>{
        this.id= data.id

        this.getUserTasks()
      }
    )
  }

  taskId:any

  showDetailsDialog(id:any){
    this.taskId=id
    this.visible1=true
  }

  showSubDialog(id:any){
    this.taskId=id
    this.visible2=true
  }

  getUserTasks(){
    this.taskService.getUserTasks(this.id).subscribe(
      (data:any)=>{
        this.tasks=data
        if(data.taskPriority=='High'){
          this.colors.push('red')
        }
        else if(data.taskPriority=='Medium'){
          this.colors.push('yellow')
        }
        else{
          this.colors.push('green')
        }

      }
    )
  }

}
