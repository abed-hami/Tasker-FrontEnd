import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import 'chartjs-adapter-date-fns';
import 'chart.js/auto';
import Chart from 'chart.js/auto';

import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { LoginService } from '../../services/login.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule,ChartModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent {
  today:any
  firstDayOfMonth:any
  constructor(private taskService:TaskService,private loginService:LoginService,private projectService:ProjectService){
     this.today = new Date();
 this.firstDayOfMonth = new Date(this.today.getFullYear(), this.today.getMonth()-1, 1);
  }
  data:any
  chartOptions:any

  status:any
  statusLabels: string[]=[];
  tasks:any
  position:any
  id:any





  getUserInfo(){
    this.loginService.getUserInfo().subscribe(
      (data:any)=>{
        this.id= data.id
        this.getT()


      }
    )
  }
  project:any
  getProject(id:any){
    this.projectService.getProject(id).subscribe(
      (data)=>{
        this.project=data
      }
    )
  }

  projectId:any

  ngOnInit() {
this.projectId=localStorage.getItem("projectId")
    this.position=localStorage.getItem("position")
    this.getUserInfo()
    this.getProject(this.projectId)
    this.getTasks(this.projectId)


  }
stat="all"
  tasksData:any

getTasks(id:any){
    if(this.position=="manager"){
      this.tasks=""
      this.taskService.getTasksForManager(id,"all").subscribe(
        (data:any)=>{
          this.tasks=data



        this.chart()

        },(error)=>console.log(error)
      )
    }

  }


  tt:any

  getT(){
    if(this.position!="manager"){
this.taskService.getProjectTasks(this.id,this.projectId,this.stat).subscribe(
      (data:any)=>{
        this.tt=data


      this.chart2()

      },(error)=>console.log("TTTTT "+error)
    )
    }

  }

  chart(){


      const tasksData = this.tasks.map((task: any) => ({
        x: [new Date(task.taskStart), new Date(task.taskDeadline)],
        y: task.taskName ,
        name: task.assigneeName,
        status: task.taskStatus
    }));




    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
const today = new Date();
const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    datasets: [{
      label: '# of Votes',
      data:tasksData,
      backgroundColor: function(context:any) {
        const status = context.dataset.data[context.dataIndex].status;

        if(status == "testing"){
            return '#DDD6FA'
        }
        else if(status == "completed"){
          return '#DCFCE7'
        }
        else if(status=="on-hold"){
          return '#FEF3C7'
        }
        else if(status=="in-progress"){
          return '#2675EB'
        }

        return '#E5E7EB'
      },
      borderColor: function(context:any) {
        const status = context.dataset.data[context.dataIndex].status;
        return 'rgba(75, 192, 192, 1)';
      },
      borderWidth: 1,
      borderSkipped: false,
      borderRadius: 6,
      barPercentage: 0.5
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,

    indexAxis: 'y',
    scales: {
      x: {
        position: 'top',
        type: 'time',
        time: {
          unit: 'week',
        },
        min: this.project.startDate,
        max: this.project.endDate
      }
    },

    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: function (tooltipItem: any) {
            const start = new Date(tooltipItem[0].raw.x[0]).toLocaleDateString();
            const end = new Date(tooltipItem[0].raw.x[1]).toLocaleDateString();
            const name = tooltipItem[0].raw.name;
            const status = tooltipItem[0].raw.status;
            return [`${name}`, `${start} - ${end}`,`${status}`]
          },
          label: function (context: any) {
            let label = '';

            return label;
          }
        }
      },


    },
    },


  plugins: [
    {
    id: 'currentDateLine',
    afterDraw: function(chart) {
      const ctx = chart.ctx;
      const xAxis = chart.scales['x'];
      const yAxis = chart.scales['y'];
      const xValue = today.getTime();

      if (xAxis.min <= xValue && xValue <= xAxis.max) {
        const xPos = xAxis.getPixelForValue(xValue);
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.moveTo(xPos, yAxis.top);
        ctx.lineTo(xPos, yAxis.bottom);
        ctx.stroke();
        ctx.restore();
      }
    }
  },
],


});
  }



  chart2(){


    const tasksData = this.tt.map((task: any) => ({
      x: [new Date(task.taskStart), new Date(task.taskDeadline)],
      y: task.taskName ,
      name: task.assigneeName,
      status: task.taskStatus
  }));




  const ctx = document.getElementById('myChart') as HTMLCanvasElement;
const today = new Date();
const myChart = new Chart(ctx, {
type: 'bar',
data: {
  datasets: [{
    label: '# of Votes',
    data:tasksData,
    backgroundColor: function(context:any) {
      const status = context.dataset.data[context.dataIndex].status;

      if(status == "testing"){
          return '#DDD6FA'
      }
      else if(status == "completed"){
        return '#DCFCE7'
      }
      else if(status=="on-hold"){
        return '#FEF3C7'
      }
      else if(status=="in-progress"){
        return '#2675EB'
      }

      return '#E5E7EB'
    },
    borderColor: function(context:any) {
      const status = context.dataset.data[context.dataIndex].status;
      return 'rgba(75, 192, 192, 1)';
    },
    borderWidth: 1,
    borderSkipped: false,
    borderRadius: 6,
    barPercentage: 0.5
  }]
},
options: {
  responsive: true,
  maintainAspectRatio: false,

  indexAxis: 'y',
  scales: {
    x: {
      position: 'top',
      type: 'time',
      time: {
        unit: 'week',
      },
      min: this.project.startDate,
      max: this.project.endDate
    }
  },

  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        title: function (tooltipItem: any) {
          const start = new Date(tooltipItem[0].raw.x[0]).toLocaleDateString();
          const end = new Date(tooltipItem[0].raw.x[1]).toLocaleDateString();
          const name = tooltipItem[0].raw.name;
          const status = tooltipItem[0].raw.status;
          return [`${name}`, `${start} - ${end}`,`${status}`]
        },
        label: function (context: any) {
          let label = '';

          return label;
        }
      }
    },


  },
  },


plugins: [
  {
  id: 'currentDateLine',
  afterDraw: function(chart) {
    const ctx = chart.ctx;
    const xAxis = chart.scales['x'];
    const yAxis = chart.scales['y'];
    const xValue = today.getTime();

    if (xAxis.min <= xValue && xValue <= xAxis.max) {
      const xPos = xAxis.getPixelForValue(xValue);
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.moveTo(xPos, yAxis.top);
      ctx.lineTo(xPos, yAxis.bottom);
      ctx.stroke();
      ctx.restore();
    }
  }
},
],


});
}



}
