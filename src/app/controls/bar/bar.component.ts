import { Component, Input } from '@angular/core';
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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [CommonModule,BadgeModule, MenuModule, MenubarModule,DialogModule,RouterModule,SidebarModule],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.css'
})
export class BarComponent {
  constructor(private userService:LoginService,private cookieService:CookiesService,private router: Router){}
  @Input()customProp!: boolean;
  name:any
  visible: boolean = false;
  now = new Date();
  currentDateTime = this.now.toLocaleDateString();
  items: MenuItem[] | undefined;



  showDialog() {
    this.visible = true;


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

    this.cookieService.deleteCookie()



  }

  getUserInfo(){
    this.userService.getUserInfo().subscribe(
      (data:any)=>{
        this.name= data.name
      }
    )
  }



  logout() {
    localStorage.clear()
    this.cookieService.deleteCookie()
  }


}
