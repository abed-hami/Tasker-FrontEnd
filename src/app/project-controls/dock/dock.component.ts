import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DockModule } from 'primeng/dock';
import { TabMenuModule } from 'primeng/tabmenu';
@Component({
  selector: 'app-dock',
  standalone: true,
  imports: [DockModule,TabMenuModule,RouterModule],
  templateUrl: './dock.component.html',
  styleUrl: './dock.component.css'
})
export class DockComponent {

  items: MenuItem[] | undefined;

  activeItem: MenuItem | undefined;

  ngOnInit() {

      this.items = [

          { label: 'Dashboard', icon: 'fa fa-bar-chart',routerLink:"projectDashboard" },
          { label: 'Timeline', icon: 'fas fa-stream',routerLink:"timeline" },
          { label: 'Team', icon: 'fa fa-group',routerLink:"members" },
          { label: 'Tasks', icon: 'fas fa-tasks',routerLink:"projectTasks" },
          { label: 'Announcements', icon: 'fa fa-bullhorn',routerLink:"announcements" },
          { label: 'Details', icon: 'far fa-edit',routerLink:"details" },
      ];

      this.activeItem = this.items[0];





  }
}
