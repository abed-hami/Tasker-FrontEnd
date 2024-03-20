import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';

import { CalendarOptions } from '@fullcalendar/core';
import { a1 } from '@fullcalendar/core/internal-common';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {

  event:any=[
    { title: 'event 1', date: '2024-03-01', end:'2024-03-03', color:'red',priority:'high', description:'blablabla' },
    { title: 'event 2', date: '2024-03-02', end:'2024-03-16' },
    { title: 'event 3', date: '2024-03-02' }
  ]


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    events: this.event,
    eventClick: (arg) => this.handleEventClick(arg),

  };

  handleDateClick(arg: DateClickArg) {
    console.log('date click! ' + arg.dateStr);
  }

  handleEventClick(arg: a1) {
    const event = arg.event;
    const description = event.extendedProps['description'];
    const priority = event.extendedProps['priority'];

    let message = 'Event: ' + event.title + '\n';
    message += 'Description: ' + description + '\n';
    message += 'Priority: ' + priority;

    alert(message);
  }

}
