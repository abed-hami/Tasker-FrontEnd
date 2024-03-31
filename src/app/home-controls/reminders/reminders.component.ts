import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reminders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reminders.component.html',
  styleUrl: './reminders.component.css'
})
export class RemindersComponent {
  currentDate: any;

  constructor(){
    this.currentDate = new Date();

  }
}
