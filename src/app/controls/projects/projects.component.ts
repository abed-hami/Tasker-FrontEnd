import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
    selector: 'app-projects',
    standalone: true,
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.css',
    imports: [MenuModule, MenubarModule, SidebarComponent]
})
export class ProjectsComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
        {
            label: 'Projects',
            icon: 'pi pi-fw pi-folder',
            routerLink:'/dashboard'
        },
        {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-chart-line'
        },
        {
          label: 'Tasks',
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
}


}
