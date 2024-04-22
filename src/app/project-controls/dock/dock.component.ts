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
          { label: 'Timeline', icon: 'far fa-stream',routerLink:"timeline" },
          { label: 'Team', icon: 'fa fa-group',routerLink:"members" },
          { label: 'Tasks', icon: 'pi pi-fw pi-file',routerLink:"projectTasks" },
          { label: 'Announcements', icon: 'fa fa-group',routerLink:"announcements" },
      ];

      this.activeItem = this.items[0];
  }
}
