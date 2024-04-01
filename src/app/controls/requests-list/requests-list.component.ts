import { Component } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { CookiesService } from '../../services/cookies.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-requests-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './requests-list.component.html',
  styleUrl: './requests-list.component.css'
})
export class RequestsListComponent {
  constructor(private requestService:RequestService,private cookie:CookiesService){}

  requests:any
  pageSize = 4;
pageNumber = 0;

goToNextPage() {
  this.pageNumber++;
}

goToPreviousPage() {
  if (this.pageNumber > 0) {
    this.pageNumber--;
  }
}

get totalPages() {
  return Math.ceil(this.requests.length / this.pageSize);
}

goToPage(page: number) {
  this.pageNumber = page;
}


get paginatedRequests() {
  const start = this.pageNumber * this.pageSize;
  return (this.requests || []).slice(start, start + this.pageSize);
}

  getMemberRequests(memberId:any){
    this.requestService.getMemberRequests(memberId).subscribe(
      (data)=>{
          this.requests=data
          console.log(data)
      }
    )
  }

  ngOnInit(){
    this.getMemberRequests(this.cookie.getCookieId())
  }
}
