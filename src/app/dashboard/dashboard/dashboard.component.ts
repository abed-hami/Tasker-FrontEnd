import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { CalendarComponent } from "../../controls/calendar/calendar.component";
import { SidebarComponent } from "../../controls/sidebar/sidebar.component";
import { NavbarComponent } from "../../home/navbar/navbar.component";
import { DashnavComponent } from "../../controls/dashnav/dashnav.component";
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { DockComponent } from "../../project-controls/dock/dock.component";
import { CookiesService } from '../../services/cookies.service';
@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [CommonModule, CalendarComponent, SidebarComponent, NavbarComponent, DashnavComponent, TabMenuModule, BadgeModule, DockComponent]
})
export class DashboardComponent implements OnInit {

  constructor(private http:HttpClient,private service:LoginService,private cookieService:CookiesService){

  }

  items: MenuItem[] | undefined;

  activeItem: MenuItem | undefined;

  async ngOnInit() {
      this.items = [
          { label: 'Home', icon: 'pi pi-fw pi-home' },
          { label: 'Calendar', icon: 'pi pi-fw pi-calendar' },
          { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
          { label: 'Documentation', icon: 'pi pi-fw pi-file' },
          { label: 'Settings', icon: 'pi pi-fw pi-cog' }
      ];

      this.activeItem = this.items[0];

      this.getUserInfo()




  }



  id:any

  mytoken=localStorage.getItem('myToken')

  async getUserInfo() {
    return new Promise<void>((resolve, reject) => {
      this.service.getUserInfo().subscribe(
        (data: any) => {
          this.id = data.id;
          console.log(this.id)
          this.cookieService.setCookie(this.mytoken,this.id)
          resolve();
        },
        error => {
          reject(error); }
      );
    });
  }

}
