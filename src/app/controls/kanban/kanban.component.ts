import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { DialogModule } from 'primeng/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { KanbanService } from '../../services/kanban.service';
import { CommonModule } from '@angular/common';
import { CookiesService } from '../../services/cookies.service';
import { FormsModule } from '@angular/forms';
import { ToDo } from '../../models/kanban';
import { ToastService } from '../../services/toast.service';
@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CdkDropList, CdkDrag,CommonModule,DragDropModule,FormsModule,CommonModule,DialogModule],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.css'
})
export class KanbanComponent {


  toDoObject: ToDo= new ToDo()
 statuses = ['To Do', 'In Progress', 'Done'];

 getStatusArray(status: string) {
  switch (status) {
    case 'To Do':
      return this.todo;
    case 'In Progress':
      return this.inProgress;
    case 'Done':
      return this.done;
    default:
      return [];
  }
}
currentItem:any

onDragStart(item:any){

  this.currentItem=item;
}

delete(id:any){
  this.kanabService.delete(id).subscribe(
    (data)=>{
      this.toast.showInfo("Item Deleted!")
      this.ngOnInit()
    },
    (error)=>{
      this.toast.showError("Error Deleting Item!")
    }
  )
}
addItem(){
  this.toDoObject.memberId=this.cookie.getCookieId()
  this.kanabService.addToDo(this.toDoObject).subscribe(
    (data)=>{
      this.toast.showSuccess("Item Added!")
      this.ngOnInit()
    },
    (error)=>{
      this.toast.showError("Error Adding Item!")
    }
  )
}

onDrop(event:any,status:any){


  const record = this.joined.find(m=>m.id==this.currentItem.id)
  if (record!=undefined) {

    record.status=status

    this.updateStatus(record.id,status)
    this.ngOnInit()
  }

  this.currentItem=null
}

visible=false

showDialog(){
  this.visible=true
}

updateStatus(id:any,status:any){

  this.kanabService.updateStatus(id,status).subscribe(
    (data)=>{

    },
    (error)=>{
      console.log(error)
    }
  )
}

onDragOver(event:any){

  event.preventDefault()
}

joined:any[]=[]

drop(event: CdkDragDrop<any>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
}


  constructor(private kanabService:KanbanService,private cookieService:CookiesService,private toast:ToastService,private cookie:CookiesService){}

  todo:any[]=[]
  done:any[]=[]
  inProgress:any[]=[]



  ngOnInit(){
    this.getDoneList()
    this.getPendingList()
    this.getToDoList()
    this.getAll()


  }

  getToDoList(){
    this.kanabService.getList(this.cookieService.getCookieId(),"to-do").subscribe(
      (data:any)=>{
        this.todo=data


      },
      (error)=>{
        console.log(error)
      }
    )
  }

  getAll(){
    this.kanabService.getList(this.cookieService.getCookieId(),"null").subscribe(
      (data:any)=>{

        this.joined=data

      },
      (error)=>{
        console.log(error)
      }
    )
  }

  getPendingList(){
    this.kanabService.getList(this.cookieService.getCookieId(),"in-progress").subscribe(
      (data:any)=>{
        this.inProgress=data

      },
      (error)=>{
        console.log(error)
      }
    )
  }

  getDoneList(){
    this.kanabService.getList(this.cookieService.getCookieId(),"done").subscribe(
      (data:any)=>{
        this.done=data

      },
      (error)=>{
        console.log(error)
      }
    )
  }



}
