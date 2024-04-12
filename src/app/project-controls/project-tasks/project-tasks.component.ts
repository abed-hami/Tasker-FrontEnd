import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { SubtasksService } from '../../services/subtasks.service';
import { ToastService } from '../../services/toast.service';
import { ButtonModule } from 'primeng/button';
import { CommentsService } from '../../services/comments.service';
import { Comment } from '../../models/comment';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CookiesService } from '../../services/cookies.service';
import { RouterModule } from '@angular/router';
import { ProgressBarModule } from 'primeng/progressbar';
import { Request } from '../../models/request';
import { RequestService } from '../../services/request.service';
import { Task } from '../../models/task';
import { TeamService } from '../../services/team.service';
import { PhasesService } from '../../services/phases.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-tasks',
  standalone: true,
  imports: [CommonModule,DialogModule,DividerModule,ButtonModule,FormsModule,RouterModule,ProgressBarModule],
  templateUrl: './project-tasks.component.html',
  styleUrl: './project-tasks.component.css'
})
export class ProjectTasksComponent {
  visible1=false
  visible2=false
  position:any
  id:any
  tasks:any
  taskId:any
  subTasks:any
  progress:any
  comments:any
  count:any
  completed:any
  request:Request=new Request()
  constructor(private taskService:TaskService, private loginService:LoginService,private subTaskService:SubtasksService,private toast:ToastService,private commentsService:CommentsService,private cookie:CookiesService, private requestService:RequestService,private teamService:TeamService,private phaseService:PhasesService,private projectService:ProjectService){}
  pageSize = 4;
  pageNumber = 0;
  visible=false;
  phases:any
  projectId:any



  taskObject : Task = new Task()
  get totalPages() {
    return Math.ceil(this.tasks.length / this.pageSize);
  }

  getPhasesByProject(id:any){
    this.phaseService.getProjectPhases(id).subscribe(
      (data)=>{
        this.phases=data
      }
    )
  }
  get paginatedTasks() {
    const start = this.pageNumber * this.pageSize;
    return (this.tasks || []).slice(start, start + this.pageSize);
  }

  goToPage(page: number) {
    this.pageNumber = page;
  }
  getAllSubCount(id:any){
    this.subTaskService.getCount(id).subscribe(
      (data)=>{
        this.count=data
        console.log(this.count)
      },
      (error)=>console.log(error)
    )
  }

  sendRequest(taskId:any){
    this.request.taskId=taskId;
    this.request.issuerId=this.cookie.getCookieId()
    this.request.status="pending",
    this.request.requestDate=new Date()
    this.requestService.sendRequest(this.request).subscribe(
      (data)=>{
        this.toast.showSuccess("Request Sent Successfully")
      },
      (error)=>this.toast.showError("Error Sending Request")
    )

  }

  getCompletedCount(id:any){
    this.subTaskService.getCompletedCount(id).subscribe(
      (data)=>{
        this.completed=data
      },(error)=>console.log(error)
    )
  }


  ngOnInit(){
    this.projectId= localStorage.getItem("projectId")
    this.position=localStorage.getItem("position")
    this.getUserInfo()
    this.getTeamByProject(this.projectId)
    this.getPhasesByProject(this.projectId)


  }

  disable=false
  disabling(id:any):boolean{
    if(this.id!=id){
      return this.disable=true
    }
    return this.disable=false
  }

  assignTask(){
      this.taskObject.projectId=this.projectId
      this.taskObject.status="pending"
      this.taskService.assignTask(this.taskObject).subscribe(
        (data)=>{
          this.toast.showSuccess("Task Assigned Successfully!")
          this.getTasks()
        },
        (error)=>{
          this.toast.showWarn("Error Assigning Task!")
        }
      )
  }
  team:any
  getTeamByProject(id:any){
    this.teamService.getProject(id).subscribe(
      (data)=>{
        this.team=data

      }
    )
  }
  showDialog(){
    this.visible=true
  }

  getTaskComments(taskId:any){
    this.commentsService.GetTaskComments(taskId).subscribe(
      (data)=>{
        this.comments=data
      },
      (error)=>console.log(error)
    )
  }

  getProgress(taskId:any){
    this.subTaskService.getProgress(taskId).subscribe(
      (data:any)=>{
        this.progress= Math.round(data);

      },
      (error)=>console.log(error)
    )
    return this.progress
  }

  updateStatus(subId:any,taskId:any){
    this.subTaskService.updateStatus(subId).subscribe(
      (data:any)=>{
        this.toast.showInfo("subtask status updated ")
        this.getCompletedCount(taskId)
        this.getProgress(taskId)
      },
      (error)=>console.log(error)
    )
  }

  submitTask(id:any){
    this.taskService.updateStatus(id).subscribe(
      (data)=>{
        this.toast.showSuccess('Task Completed')
        this.getTasks()
      },
      (error)=>{
        this.toast.showWarn('Subtasks Not Completed ')
      }
    )
  }

  changeTaskStatus(id:any,status:any){
    this.taskService.UpdateTaskStatus(id,status).subscribe(
      (data)=>{
        this.toast.showInfo('Task Status Updated')
        this.getTasks()
      },
      (error)=>{
        this.toast.showWarn('Error occured ')
      }
    )
  }


  getColor(priority:any){
    if(priority=='high'||priority=='High'){return 'red'}
    else if(priority=='medium' || priority=='Medium'){return 'yellow'}
    else{return 'green'}
  }

  memberId:any

  getStatusColor(status:string) {
    if(status=='blocked'){ return 'red' }
    else if(status=='in-progress' ){ return 'green' }
    else if( status=='testing'){return  'purple'}
    else if (status=='on-hold'){return 'yellow'}
    else if (status=='open'){return 'indigo'}
    else{ return 'gray' }
  }

  getUserInfo(){
    this.loginService.getUserInfo().subscribe(
      (data:any)=>{
        this.id= data.id

        this.getTasks()
      }
    )
  }
  project:any




  width:any

  showDetailsDialog(id:any,memberId:any){
    this.taskId=id
    this.visible1=true
    this.memberId=memberId
    this.getTaskComments(id)
    this.postComment(id)
    this.getSubTasks(id)
    this.getCompletedCount(id)
    this.getAllSubCount(id)

    this.width=`style="width: ${this.getProgress(id)}%"`
  }

  editTask(id:any){
    alert(id)
  }

  showSubDialog(id:any){

    this.visible2=true
    this.getSubTasks(id)
  }

  getTasks(){
    if(this.position=="manager"){
      this.tasks=""
      this.taskService.getTasksForManager(this.projectId).subscribe(
        (data:any)=>{
          this.tasks=data
          console.log(data)


        }
      )
    }
    else{
      this.tasks=""
      this.taskService.getProjectTasks(this.id,localStorage.getItem("projectId")).subscribe(
        (data:any)=>{
          this.tasks=data
          console.log(data)


        }
      )
    }

  }

  getSubTasks(taskId:any){
    this.subTaskService.getSubTaskByTaskId(taskId).subscribe(
      (data:any)=>{
        this.subTasks=data

      },
      (error)=>{
        console.log(error)
      }
    )
  }

  comment:Comment=new Comment()

  postComment(taskId:any){
    this.comment.commentDate= new Date()
    this.comment.taskId=this.taskId
    this.comment.memberId= this.cookie.getCookieId()

  }

  addComment(){
    this.commentsService.PostComment(this.comment).subscribe(
      (data)=>{
        this.getTaskComments(this.comment.taskId)
      },
      (error)=>{
        console.log(error)
      }
    )


  }

}