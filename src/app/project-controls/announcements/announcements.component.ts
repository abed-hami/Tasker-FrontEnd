import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AnnouncementService } from '../../services/announcement.service';

import { DialogModule } from 'primeng/dialog';
import { announcement } from '../../models/announcement';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [CommonModule,DialogModule,FormsModule],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.css'
})
export class AnnouncementsComponent {
  visible2:any
  announcementObject: announcement= new announcement()
  announcementObject2: announcement= new announcement()
  announcements:any
  announcementId:any
  visible=false

  announcementDeatil:any
  constructor(private announcementsService:AnnouncementService,private toast:ToastService){}

  showDialog(id:any){
    this.announcementId = id;
    this.getById(id)

    this.visible=true



  }

  today:any

  addAnnouncement(){
    this.announcementObject2.memberId=null
    this.announcementObject2.projectId=this.projectId
    if(this.checkFields()){
      this.announcementsService.addAnnouncement(this.announcementObject2).subscribe(
      (data)=>{
        this.toast.showSuccess("Announcement Added Successfully")
        this.visible2=false
        this.ngOnInit()
      },
      (error)=>{
        console.log(error)
      }
    )
    }
    else{
      this.toast.showWarn("Please Fill All Fields")
    }


  }

  showDialog2(){
    this.visible2=true
  }

  editAnnouncement(){
   this.announcementsService.updateAnnouncement(this.announcementObject.id,this.announcementObject).subscribe(
    (data)=>{
        this.toast.showSuccess("Announcement Updated Successfully")
        this.visible=false

        this.ngOnInit()
    },
    (error)=>{
      console.log(error)
    }
  )
  }



  getById(id:any){
    this.announcementsService.getById(id).subscribe(
      (data:any)=>{


        this.announcementObject.announcement1=data.announcement1
        this.announcementObject.announcemenetDate=data.announcemenetDate
        this.announcementObject.description=data.description
        this.announcementObject.id=data.id
        this.announcementObject.projectId=data.projectId
        this.announcementObject.memberId = null

      }
    )
  }

  checkFields(): boolean {

    if (!this.announcementObject2.announcement1 || !this.announcementObject2.announcemenetDate || !this.announcementObject2.description) {

      return false;
    } else {

      return true;
    }
  }


  getProjectAnnouncements(id:any){
    this.announcementsService.getProjectAnnouncements(id).subscribe(
      (data)=>{
        this.announcements=data
      },
      (error)=>{
        console.log(error)
      }
    )
  }
  projectId:any
  position:any
  getDate(date:any){
    const datePart = date.split("T")[0];

    return datePart
  }
  delete(id:any){
    this.announcementsService.delete(id).subscribe(
      (data)=>{
        this.toast.showWarn('Delete Successful')
        this.visible=false
        this.ngOnInit()
      }
    )
  }
  ngOnInit(){
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    this.today = `${year}-${month}-${day}`;
    this.projectId=localStorage.getItem("projectId")
    this.position=localStorage.getItem('position')
    this.getProjectAnnouncements(localStorage.getItem("projectId"))
  }
}
