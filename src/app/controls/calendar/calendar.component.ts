import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { TaskService } from '../../services/task.service';
import { CookiesService } from '../../services/cookies.service';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule,DialogModule,CommonModule,FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  visible: boolean = false;

  constructor(private taskService: TaskService, private cookieService: CookiesService) {}

  tasks: any;
  selectedEvent:any={
    name:"",
    description:"",
    priority:""
  }

  ngOnInit() {
    this.getUserTasks();
  }

  getUserTasks() {
    this.taskService.getUserTasks(this.cookieService.getCookieId()).subscribe(
      (data: any) => {
        this.tasks = data.map((task: { taskName: any; taskStart: any; taskDeadline: any; taskDescription: any; taskPriority: any; }) => ({
          title: task.taskName,

          date: this.formatDate(task.taskDeadline),
          description: task.taskDescription,
          priority: task.taskPriority,
          color: this.getColorByPriority(task.taskPriority),


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
      case 'high':
    return '#CC0000';
  case 'medium':
    return '#FFA500';
  default:
    return '#008000';
    }
  }

  updateCalendarOptions() {
    this.calendarOptions.events = this.tasks;

  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),

    eventClick: (arg) => this.handleEventClick(arg),

  };



  handleDateClick(arg: DateClickArg) {
    console.log('date click! ' + arg.dateStr);
  }

  handleEventClick(arg: any) {
    const event = arg.event;

    const name = event.title;

    const description = event.extendedProps['description'];
    const priority = event.extendedProps['priority'];

    this.selectedEvent.name=name
    this.selectedEvent.description=description
    this.selectedEvent.priority=priority
    console.log(this.selectedEvent)
    this.visible=true


  }
}
