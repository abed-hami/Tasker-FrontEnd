import { Component } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { CookiesService } from '../../services/cookies.service';
import { CommonModule } from '@angular/common';
import { RequestsListComponent } from '../requests-list/requests-list.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
export class RequestsComponent {

}
