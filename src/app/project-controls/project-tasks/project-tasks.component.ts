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
import { HttpErrorResponse } from '@angular/common/http';
import { CookiesService } from '../../services/cookies.service';
import { RouterModule } from '@angular/router';
import { ProgressBarModule } from 'primeng/progressbar';
import { Request } from '../../models/request';
import { RequestService } from '../../services/request.service';
import { Task } from '../../models/task';
import { TeamService } from '../../services/team.service';
import { PhasesService } from '../../services/phases.service';
import { ProjectService } from '../../services/project.service';
import { subtask } from '../../models/subtasks';

import { DropdownModule } from 'primeng/dropdown';
import { HubConnection, HubConnectionBuilder,LogLevel } from '@aspnet/signalr';
@Component({
  selector: 'app-project-tasks',
  standalone: true,
  imports: [CommonModule,DialogModule,DividerModule,ButtonModule,FormsModule,RouterModule,ProgressBarModule,DropdownModule],
  templateUrl: './project-tasks.component.html',
  styleUrl: './project-tasks.component.css'
})
export class ProjectTasksComponent {
  visible1=false
  visible2=false
  selectedCity= {name:"Pending"};
  position:any
  id:any
  private _hubConnection!: HubConnection;
  tasks:any
  taskId:any
  subTasks:any
  progress:any
  comments:any
  count:any
  completed:any
  request:Request=new Request()
  options:any
  constructor(private taskService:TaskService, private loginService:LoginService,private subTaskService:SubtasksService,private toast:ToastService,private commentsService:CommentsService,private cookie:CookiesService, private requestService:RequestService,private teamService:TeamService,private phaseService:PhasesService,private projectService:ProjectService){}
  pageSize = 4;
  pageNumber = 0;
  visible=false;
  phases:any
  projectId:any

  subObject : subtask=new subtask()

  taskInfo:any

  getTaskById(id:any){
    this.taskService.getTaskById(id).subscribe(
      (data:any)=>{
        const deadline= data.deadline.split("T")
        const start= data.startDate.split("T")
        this.editTaskObject.id=data.id,
        this.editTaskObject.name=data.name
        this.editTaskObject.description=data.description
        this.editTaskObject.budget=data.budget
        this.editTaskObject.deadline=deadline[0]
        this.editTaskObject.memberId=data.memberId
        this.editTaskObject.priority=data.priority
        this.editTaskObject.projectId=data.projectId
        this.editTaskObject.startDate=start[0]
        this.editTaskObject.status=data.status


      }
    )
  }

  editTask(){
    this.taskService.updateTask(this.editTaskObject).subscribe(
      (data)=>{
        this.toast.showSuccess("Task Edited Successfully")
        this.visible4=false
        this.getTasks()
      },
      (error)=>{
        this.toast.showWarn("Project Budget Insufficient")
      }
    )
  }


  taskObject : Task = new Task()

  editTaskObject : Task = new Task()
  get totalPages() {
    return Math.ceil(this.filteredProjects.length / this.pageSize);
  }

  get totalCompletedPages() {
    return Math.ceil(this.filteredCompletedProjects.length / this.pageSize);
  }

  getPhasesByProject(id:any){
    this.phaseService.getProjectPhases(id).subscribe(
      (data)=>{
        this.phases=data
      }
    )
  }
  searchTerm: string = '';

  searchTerm2:string=''


  get filteredProjects() {
    if (!this.searchTerm) {
      return this.tasks;
    }

    return this.tasks.filter((task: any) =>
      task.taskName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get filteredCompletedProjects() {
    if (!this.searchTerm2) {
      return this.completedTasks;
    }

    return this.completedTasks.filter((task: any) =>
      task.taskName.toLowerCase().includes(this.searchTerm2.toLowerCase())
    );
  }


  get paginatedTasks() {
    const start = this.pageNumber * this.pageSize;
    return (this.filteredProjects || []).slice(start, start + this.pageSize);
  }

  get paginatedCompletedTasks() {
    const start = this.pageNumber * this.pageSize;
    return (this.filteredCompletedProjects || []).slice(start, start + this.pageSize);
  }

  goToPage(page: number) {
    this.pageNumber = page;
  }
  getAllSubCount(id:any){
    this.subTaskService.getCount(id).subscribe(
      (data)=>{
        this.count=data

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
    this.options = [

      { name: 'Pending' },
      { name: 'Completed' },



  ];


  this._hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7183/taskHub')
      .configureLogging(LogLevel.Information)
      .build();

    this._hubConnection
      .start()
      .then(() => console.log('task Connection started!'))
      .catch(err => console.log(err));

    this._hubConnection.on('submitTask', (request:any) => {
      if(request==this.cookie.getCookieId()){

          this.getTasks()



      }
    });

  }

  disable=false
  disabling(id:any):boolean{
    if(this.id!=id){
      return this.disable=true
    }
    return this.disable=false
  }
  bool:any
  assignTask(){
      this.taskObject.projectId=this.projectId
      this.taskObject.status="pending"
      this.taskObject.phaseId=null


      this.taskService.checkBudget(this.taskObject.projectId,this.taskObject.budget).subscribe
      (
        (data)=>{
         this.bool=data

         if(this.bool){
          this.createTask(this.taskObject)
         }
         else{
          this.toast.showWarn("Project Budget Insufficient!")
         }
         this.clearForm()
        },
        (error)=>{
          this.toast.showWarn("Fill All Fields")

        },

      )





  }
  clearForm(){
    this.taskObject = {
      id:'',
      name: '',
      memberId: '',
      status:'',
      startDate: '',
      phaseId:'',
      projectId:'',
      deadline: '',
      budget: '',
      priority: '',
      description: ''
    };
  }
  visible3=false
  visible4=false


  showTaskDetails(taskId:any){
    this.taskId=taskId

    this.visible4=true;
    this.getTaskById(taskId)

  }




  addSubTask(){
    this.subObject.taskId=this.taskId
    this.subObject.status="Pending"
    this.subTaskService.addSubTask(this.subObject).subscribe(
      (data)=>{
        this.toast.showSuccess("SubTask Added Successfully")
        this.subObject.name=""
        this.getSubTasks(this.taskId)
        this.getAllSubCount(this.taskId)
        this.getProgress(this.taskId)
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  addSubDialog(){
    this.visible3=true
  }
  createTask(taskObject:any){
    this.taskService.assignTask(this.taskObject).subscribe(
      (data)=>{
        this.toast.showSuccess("Task Assigned Successfully!")

        this.getTasks()
        this.clearForm()

      },
      (error)=>{

          this.messageResponse(error)


      }
    )


  }

  messageResponse(status:any){
    if(status.status==404){
      return this.toast.showWarn("Member exceeded Task Limit!")
    }
    else{
      return this.toast.showWarn("Error In Task Dates!")
    }

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
        this.visible1=false
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



  showSubDialog(id:any){

    this.visible2=true
    this.getSubTasks(id)
  }

  completedTasks:any

  getTasks(){
    if(this.position=="manager"){
      this.tasks=""
      this.completedTasks=""
      this.taskService.getTasksForManager(this.projectId,"null").subscribe(
        (data:any)=>{

              this.tasks=data

        }
      )

      this.taskService.getTasksForManager(this.projectId,"completed").subscribe(
        (data:any)=>{

              this.completedTasks=data

        }
      )
    }
    else{
      this.tasks=""
      this.completedTasks=""
      this.taskService.getProjectTasks(this.id,localStorage.getItem("projectId"),"null").subscribe(
        (data:any)=>{
          this.tasks=data
        }
      )

      this.taskService.getProjectTasks(this.id,localStorage.getItem("projectId"),"completed").subscribe(
        (data:any)=>{
          this.completedTasks=data
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
