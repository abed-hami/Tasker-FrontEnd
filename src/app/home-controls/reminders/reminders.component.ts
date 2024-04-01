import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AnnouncementService } from '../../services/announcement.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-reminders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reminders.component.html',
  styleUrl: './reminders.component.css'
})
export class RemindersComponent {
  currentDate: any;
  announcements:any
  id:any

  constructor(private announcementService:AnnouncementService,private loginService:LoginService){
    this.currentDate = new Date();

  }

  getMemberAnnouncements(memberId:any){
    this.announcementService.getAnnouncementByMember(memberId).subscribe(
      (data:any)=>{
        this.announcements=data
        console.log(data)
      }
    )
  }

  today:any
  ngOnInit(){
    this.getUserInfo(localStorage.getItem("myToken"))
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    this.today = `${year}-${month}-${day}`;

  }

  getDate(date:any){
    const datePart = date.split("T")[0];
    console.log(datePart);
    return datePart
  }

  async getUserInfo(mytoken:any) {
    return new Promise<void>((resolve, reject) => {
      this.loginService.getUserInfo().subscribe(
        (data: any) => {
          this.id = data.id;
          this.getMemberAnnouncements(this.id)
          resolve();
        },
        error => {
          reject(error); }
      );
    });
  }
}
