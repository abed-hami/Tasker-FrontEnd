import { Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { MenuItem } from 'primeng/api/menuitem';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
@Component({
  selector: 'app-dashnav',
  standalone: true,
  imports: [BadgeModule,MenuModule,MenubarModule],
  templateUrl: './dashnav.component.html',
  styleUrl: './dashnav.component.css'
})
export class DashnavComponent {
  now = new Date();
  currentDateTime = this.now.toLocaleDateString();
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
}

logout(){
  localStorage.clear()
}

}
