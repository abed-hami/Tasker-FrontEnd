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
import { HubConnection, HubConnectionBuilder,LogLevel } from '@aspnet/signalr';
import { MemberService } from '../../services/member.service';
import { CustomDatePipe } from '../../pipe/custom-date.pipe';
@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CommonModule,DialogModule,DividerModule,ButtonModule,FormsModule,RouterModule,ProgressBarModule,CustomDatePipe],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent {
  visible1=false
  visible2=false

  id:any
  tasks:any
  subTasks:any
  progress:any
  comments:any
  count:any
  completed:any
  request:Request=new Request()
  constructor(private taskService:TaskService, private loginService:LoginService,private subTaskService:SubtasksService,private toast:ToastService,private commentsService:CommentsService,private cookie:CookiesService, private requestService:RequestService,private upload:MemberService){}
  pageSize = 4;
  pageNumber = 0;

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    this.upload.upload(file).subscribe(
      (response:any) => {
        console.log( response.url);
        this.comment.comment1 = response.url
      },
      (error) => {
        console.error('Error uploading file:', error);

      }
    );
  }

  get totalPages() {
    return Math.ceil(this.tasks.length / this.pageSize);
  }
  searchTerm: string = '';


  get filteredProjects() {
    if (!this.searchTerm) {
      return this.tasks.slice().reverse();
    }

    return this.tasks.filter((task: any) =>
      task.taskName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  get paginatedTasks() {
    const start = this.pageNumber * this.pageSize;
    return (this.filteredProjects || []).slice(start, start + this.pageSize);
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

  private _hubConnection!: HubConnection;
  token:any
  ngOnInit(){

    this.getUserInfo()

    this._hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7183/taskHub')
      .configureLogging(LogLevel.Information)
      .build();

    this._hubConnection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log(err));

    this._hubConnection.on('sendTask', (task:any) => {
      if(task.memberId==this.id){
        this.toast.showInfo("new task added")
        this.getUserTasks()
      }



    });


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
        this.getUserTasks()
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
        this.getUserTasks()
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

        this.getUserTasks()
      }
    )
  }

  taskId:any
  width:any

  showDetailsDialog(id:any){
    this.taskId=id
    this.visible1=true
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

  getUserTasks(){
    this.taskService.getUserTasks(this.id).subscribe(
      (data:any)=>{
        this.tasks=data
        console.log(data)


      }
    )
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
