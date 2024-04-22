import { Component } from '@angular/core';
import { ProfileTableComponent } from "../profile-table/profile-table.component";

@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [ProfileTableComponent]
})
export class ProfileComponent {

}
