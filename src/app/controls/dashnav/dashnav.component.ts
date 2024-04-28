import { Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { MenuItem } from 'primeng/api/menuitem';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { LoginService } from '../../services/login.service';
import { DialogModule } from 'primeng/dialog';
import { CookieService } from 'ngx-cookie-service';
import { CookiesService } from '../../services/cookies.service';
import { Router, NavigationEnd,RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SidebarModule } from 'primeng/sidebar';
import { BarComponent } from "../bar/bar.component";
import { CommonModule } from '@angular/common';
import { NotificationsHubService } from '../../services/notifications-hub.service';
import { Pipe, PipeTransform } from '@angular/core';
import { CustomDatePipe } from '../../pipe/custom-date.pipe';
import { HubConnection, HubConnectionBuilder,LogLevel } from '@aspnet/signalr';
import { MemberService } from '../../services/member.service';
@Component({
    selector: 'app-dashnav',
    standalone: true,
    templateUrl: './dashnav.component.html',
    styleUrl: './dashnav.component.css',

    imports: [BadgeModule, MenuModule, MenubarModule, DialogModule, RouterModule, SidebarModule, BarComponent, CommonModule,CustomDatePipe]
})

export class DashnavComponent {

  constructor(private userService:LoginService,private cookieService:CookiesService,private router: Router, private notificationService:NotificationsHubService,private memberService:MemberService){}


  name:any
  visible: boolean = false;
  now = new Date();
  currentDateTime = this.now.toLocaleDateString();
  items: MenuItem[] | undefined;
  private _hubConnection!: HubConnection;
  notification:any

  valueToSend=this.visible;
  new:any

  deleteNotification(id:any){
    this.notificationService.deleteNotification(id).subscribe(
      (data)=>{
        this.getNotification(this.id)
      }
    )
  }

  showDialog() {
    this.visible = true;


          this.notificationService.updateStatus(this.id).subscribe(
            (data)=>{
              this.getNotificationCount(this.id)


            },
            (error)=>{
              console.log(error)
            }
          )




    }



  ngOnInit() {
    this.items = [
      {
        label: 'Projects',
        icon: 'pi pi-fw pi-folder',
        routerLink: '/dashboard'
      },
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-chart-line'
      },
      {
        label: 'Workload',
        icon: 'pi pi-fw pi-check'
      },
      {
        label: 'Timeline',
        icon: 'pi pi-fw pi-chart-bar',
      },
      {
        label: 'Members',
        icon: 'pi pi-fw pi-users'
      },

    ];

    this.getUserInfo()



    this._hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7183/notificationHub')
      .configureLogging(LogLevel.Information)
      .build();

    this._hubConnection
      .start()
      .then(() => console.log('notification Connection started!'))
      .catch(err => console.log(err));

    this._hubConnection.on('receiveNotification', (notification:any) => {
      if(notification.receiverId==this.id){
      this.notification.push(notification)

        this.getNotificationCount(this.id)
      }



    });


  }

  id:any
  count:any
  getNotificationCount(memberId:any){
    this.notificationService.getNotificationCount(memberId).subscribe(
      (data)=>{
        this.count=data
      }
    )
  }
  getUserInfo(){
    this.userService.getUserInfo().subscribe(
      (data:any)=>{
        this.name= data.name
        this.id= data.id;
        this.getNotification(data.id)
        this.getNotificationCount(data.id)
        this.getMemberInfoById(data.id)

      }
    )

  }

  member:any
  getMemberInfoById(id:any){
    this.memberService.getMemberById(id).subscribe(
      (data:any)=>{

        this.member=data

      }
    )
  }

  logout() {
    localStorage.clear()
    this.cookieService.deleteCookie()
  }


  getNotification(memberId:any){
    this.notificationService.getUserNotification(memberId).subscribe((data)=>{
      this.notification=data

    },
    (error)=>{
      console.log(error)
    }
  )
  }

   getIcon(category:any) {
    if (category === 'task') {
        return "M0 0h24v24H0z M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-6h4v-2h-4v2zm0-4h4V7h-4v3z";
    }
    if (category === 'submission') {
        return "M0 0h24v24H0z M9 5v3H7l5 5 5-5h-2V5h-8zm-4 9h14v2H5v-2zm2 3h10v2H7v-2z";
    }
    if (category === 'request') {
        return "M0 0h24v24H0z M12 22c-4.42 0-8-3.58-8-8V4c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v10c0 4.42-3.58 8-8 8zm-6-8v2h12v-2c0-3.31-2.69-6-6-6s-6 2.69-6 6zm6-4c-2.21 0-4 1.79-4 4h2c0-1.11.89-2 2-2s2 .89 2 2h2c0-2.21-1.79-4-4-4z";
    }
    if (category === 'accept') {
        return "M0 0h24v24H0z M9 16.2l-3.5-3.5 1.4-1.4 2.1 2.1 4.5-4.5 1.4 1.4-6 6z";
    }
    if (category === 'reject') {
        return "M0 0h24v24H0z M15.6 9l1.4-1.4L12 2.8 7 7.8l1.4 1.4L12 5.6z";
    }
    if (category === 'comment') {
        return "M0 0h24v24H0z M4 3h16c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2zm16 2l-8 5-8-5V5l8 5 8-5v14z";
    }
    return null
}


  getColor(category:any){

  }

}
