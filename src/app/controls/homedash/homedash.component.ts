import { Component } from '@angular/core';
import { CalendarComponent } from "../calendar/calendar.component";
import { DashcardsComponent } from "../../home-controls/dashcards/dashcards.component";
import { PriorityPieComponent } from "../../home-controls/priority-pie/priority-pie.component";
import { ProjectsbarComponent } from "../../home-controls/projectsbar/projectsbar.component";

import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { TaskService } from '../../services/task.service';
import { CookiesService } from '../../services/cookies.service';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RemindersComponent } from "../../home-controls/reminders/reminders.component";
@Component({
    selector: 'app-homedash',
    standalone: true,
    templateUrl: './homedash.component.html',
    styleUrl: './homedash.component.css',
    imports: [CalendarComponent, DashcardsComponent, PriorityPieComponent, ProjectsbarComponent, FullCalendarModule, DialogModule, CommonModule, FormsModule, RemindersComponent]
})
export class HomedashComponent {
  constructor(private taskService: TaskService, private cookieService: CookiesService) {}

  tasks: any;
  selectedEvent:any={
    name:"",
    description:"",
    priority:""
  }

  getUserTasks() {
    this.taskService.getUserTasks(this.cookieService.getCookieId()).subscribe(
      (data: any) => {
        this.tasks = data.map((task: { taskName: any; taskStart: any; taskDeadline: any; taskDescription: any; taskPriority: any; }) => ({
          title: task.taskName,
          date: this.formatDate(task.taskDeadline),
          end: this.formatDate(task.taskDeadline),
          description: task.taskDescription,
          priority: task.taskPriority,

        }));
        this.updateCalendarOptions();
      },
      (error) => {
        console.log(error);
      }
    );
  }


  formatDate(dateString: any): any {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getColorByPriority(priority: string): string {
    switch (priority) {
      case 'high' :
        return 'red';
      case 'medium' :
        return 'yellow';
      default:
        return 'green';
    }
  }

  updateCalendarOptions() {
    this.calendarOptions.events = this.tasks;

  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],


  };

  ngOnInit() {
    this.getUserTasks();
  }



}
