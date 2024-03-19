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
@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [CommonModule,CalendarComponent, SidebarComponent, NavbarComponent, DashnavComponent,TabMenuModule,BadgeModule]
})
export class DashboardComponent implements OnInit {

  constructor(private http:HttpClient,private service:LoginService){

  }

  items: MenuItem[] | undefined;

  activeItem: MenuItem | undefined;

  ngOnInit() {
      this.items = [
          { label: 'Home', icon: 'pi pi-fw pi-home' },
          { label: 'Calendar', icon: 'pi pi-fw pi-calendar' },
          { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
          { label: 'Documentation', icon: 'pi pi-fw pi-file' },
          { label: 'Settings', icon: 'pi pi-fw pi-cog' }
      ];

      this.activeItem = this.items[0];
  }



  mytoken=localStorage.getItem('myToken')


}
