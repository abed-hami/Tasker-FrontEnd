import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DockModule } from 'primeng/dock';
import { TabMenuModule } from 'primeng/tabmenu';
@Component({
  selector: 'app-dock',
  standalone: true,
  imports: [DockModule,TabMenuModule],
  templateUrl: './dock.component.html',
  styleUrl: './dock.component.css'
})
export class DockComponent {

  items: MenuItem[] | undefined;

  activeItem: MenuItem | undefined;

  ngOnInit() {
      this.items = [
          { label: 'Dashboard', icon: 'fa fa-bar-chart' },
          { label: 'Calendar', icon: 'pi pi-fw pi-calendar' },
          { label: 'Timeline', icon: 'far fa-stream' },
          { label: 'Team', icon: 'fa fa-group' },
          { label: 'Tasks', icon: 'pi pi-fw pi-file' },
          { label: 'Requests', icon: 'pi pi-fw pi-envelope' }
      ];

      this.activeItem = this.items[0];
  }
}
