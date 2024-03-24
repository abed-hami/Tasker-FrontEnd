import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { KanbanService } from '../../services/kanban.service';
import { CommonModule } from '@angular/common';
import { CookiesService } from '../../services/cookies.service';
@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CdkDropList, CdkDrag,CommonModule],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.css'
})
export class KanbanComponent {

  constructor(private kanabService:KanbanService,private cookieService:CookiesService){}

  todo:any
  done:any
  inProgress:any

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  ngOnInit(){
    this.getDoneList()
    this.getPendingList()
    this.getToDoList()
  }

  getToDoList(){
    this.kanabService.getList(this.cookieService.getCookieId(),"to-do").subscribe(
      (data:any)=>{
        this.todo=data
        console.log( this.todo)
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
        console.log( this.inProgress)
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
        console.log( this.done)
      },
      (error)=>{
        console.log(error)
      }
    )
  }



}
