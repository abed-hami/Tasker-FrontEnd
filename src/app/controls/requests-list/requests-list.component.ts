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

  selectedCity: any;


   flag=0
  constructor(private requestService:RequestService,private cookie:CookiesService,private toast:ToastService){}

  requests:any
  pageSize = 4;
pageNumber = 0;
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
      }
      else{
        this.toast.showError("Request was denied!")
      }
      this.ngOnInit()
      this.visible=false
    } ,
   (err) =>{console.log(err)});
}

goToPreviousPage() {
  if (this.pageNumber > 0) {
    this.pageNumber--;
  }
}

get totalPages() {
  if(this.selectedCity==undefined||this.selectedCity.name=='Sent'){

  }
  return Math.ceil(this.requests.length / this.pageSize);

}

goToPage(page: number) {
  this.pageNumber = page;
}


 get paginatedRequests() {
  const start = this.pageNumber * this.pageSize;
  if(this.selectedCity==undefined||this.selectedCity.name=='Sent'){
this.flag=0
  return (this.requests || []).slice(start, start + this.pageSize);

  }
  else{this.flag=1
    return (this.received || []).slice(start, start + this.pageSize);

  }

}

  getMemberRequests(memberId:any){
    if(this.selectedCity=='Sent' || this.selectedCity==undefined){
      this.requestService.getMemberRequests(memberId).subscribe(
      (data)=>{
          this.requests=data
          console.log(data)
      }
    )
    }
    else if(this.selectedCity=='Received'){
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
          console.log(data)
      }
    )
  }

  ngOnInit(){
    this.getMemberRequests(this.cookie.getCookieId())
    this.getReceivedRequests(this.cookie.getCookieId())
    this.options = [

      { name: 'Sent' },
      { name: 'Received' },



  ];
  }


}
