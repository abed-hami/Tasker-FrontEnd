import { Component } from '@angular/core';
declare function startTime():any;
@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.css'
})
export class ClockComponent {

  constructor(){

  }

  ngOnInit(){
    startTime()
  }


}
