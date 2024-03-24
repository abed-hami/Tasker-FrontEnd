import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DockModule } from 'primeng/dock';
@Component({
  selector: 'app-dock',
  standalone: true,
  imports: [DockModule],
  templateUrl: './dock.component.html',
  styleUrl: './dock.component.css'
})
export class DockComponent {

  items: MenuItem[] | undefined;

    position: string = "'top'";

    positionOptions = [
        {
            label: 'Bottom',
            value: 'bottom'
        },
        {
            label: 'Top',
            value: 'top'
        },
        {
            label: 'Left',
            value: 'left'
        },
        {
            label: 'Right',
            value: 'right'
        }
    ];

    ngOnInit() {
        this.items = [
            {
                label: 'dashboard',

            },
            {
                label: 'App Store',

            },
            {
                label: 'Photos',

            },
            {
                label: 'Trash',
                
            }
        ];
    }

}
