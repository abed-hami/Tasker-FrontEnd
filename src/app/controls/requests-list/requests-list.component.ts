import { Component } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { CookiesService } from '../../services/cookies.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ToastService } from '../../services/toast.service';
import { TaskService } from '../../services/task.service';
@Component({
  selector: 'app-requests-list',
  standalone: true,
  imports: [CommonModule,DialogModule,RouterModule,DropdownModule,FormsModule,ConfirmDialogModule,ToastModule],
  templateUrl: './requests-list.component.html',
  styleUrl: './requests-list.component.css'
})
export class RequestsListComponent {
  options: any;
  visible=false

  selectedCity= {name:"Sent"};


   flag=0
  constructor(private requestService:RequestService,private cookie:CookiesService,private toast:ToastService,private taskService:TaskService){}

  requests:any
  pageSize = 6;
pageNumber = 0;
pageSize2 = 6;
pageNumber2 = 0;
received:any
requestId:any

goToNextPage() {
  this.pageNumber++;
}

openDialog(requestId:any){
  if(this.flag==1){
    this.visible=true
    this.requestId=requestId
  }

}

updateRequestStatus(requestId:any,status:any){

  this.requestService.updateRequestStatus(requestId,status).subscribe(
    (data)=>{
      if(status=="accepted"){
        this.toast.showSuccess("Request was accepted!")
        this.visible=false
      }
      if(status=="denied"){
        this.toast.showError("Request was denied!")
        this.visible=false
      }

      this.getMemberRequests(this.cookie.getCookieId())
    this.getReceivedRequests(this.cookie.getCookieId())
    } ,
   (err) =>{
  if(err.status==400){
    this.toast.showWarn("Project Budget Insufficient")
    this.getMemberRequests(this.cookie.getCookieId())
    this.getReceivedRequests(this.cookie.getCookieId())
    this.visible=false
  }

   });
}

goToPreviousPage() {
  if (this.pageNumber > 0) {
    this.pageNumber--;
  }
}

get totalPages() {

  return Math.ceil(this.filteredProjects.length / this.pageSize);

}

goToPage(page: number) {
  this.pageNumber = page;
}


 get paginatedRequests() {
  const start = this.pageNumber * this.pageSize;
  if(this.selectedCity==undefined||this.selectedCity.name=='Sent'){
this.flag=0
  return (this.filteredProjects || []).slice(start, start + this.pageSize);

  }
  else{this.flag=1
    return (this.received || []).slice(start, start + this.pageSize);

  }

}

selectedStatus= {name:"pending"};

get filteredProjects() {
  if (this.selectedStatus.name=="All") {
    return this.requests;
  }

  return this.requests.filter((request: any) =>
    request.requestStatus.toLowerCase().includes(this.selectedStatus.name.toLowerCase())
  );
}


get totalReceivedPages() {

  return Math.ceil(this.received.length / this.pageSize2);

}

goToReceivedPage(page: number) {
  this.pageNumber2 = page;
}


 get paginatedReceivedRequests() {
  const start = this.pageNumber2 * this.pageSize2;

  return (this.received || []).slice(start, start + this.pageSize2);



}

getUnit(type:any){
  if (type=="financial"){
    return "$"
  }
  return "days"
}

  getMemberRequests(memberId:any){
    if(this.selectedCity.name=='Sent' || this.selectedCity==undefined){
      this.requestService.getMemberRequests(memberId).subscribe(
      (data)=>{
          this.requests=data

      }
    )
    }
    else if(this.selectedCity.name=='Received'){
      this.requestService.getReceivedRequests(memberId).subscribe(
        (data)=>{
            this.requests=data

        }
      )
    }

  }

  getColor(status:any){
    if(status=='denied'){return 'red'}
    else if(status=='accepted' ){return 'green'}
    else{return 'gray'}
  }



  getReceivedRequests(memberId:any){
    this.requestService.getReceivedRequests(memberId).subscribe(
      (data)=>{
          this.received=data

      }
    )
  }
options2:any
  ngOnInit(){
    this.getMemberRequests(this.cookie.getCookieId())
    this.getReceivedRequests(this.cookie.getCookieId())
    this.options = [
      { name: 'Sent' },
      { name: 'Received' },
  ];

  this.options2 = [


    { name: 'Pending' },
    { name: 'Accepted' },
    { name: 'Denied' },


];
  }


}
