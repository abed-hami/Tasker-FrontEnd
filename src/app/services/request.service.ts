import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http:HttpClient) { }

  sendRequest(request:any){
    return this.http.post("https://localhost:7183/api/Request",request)
  }

  getMemberRequests(memberId:any){
    return this.http.get("https://localhost:7183/api/Request/GetMemberRequest/"+memberId)
  }

  getReceivedRequests(memberId:any){
    return this.http.get("https://localhost:7183/api/Request/GetReceivedRequest/"+memberId)
  }
}
