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

  updateRequestStatus(id:any,status:any){
    return this.http.put("https://localhost:7183/api/Request/UpdateStatus/"+id+"/"+status,null)
  }

  getProjectRequest(projectId:any){
    return this.http.get("https://localhost:7183/api/Request/GetProjectRequest/"+projectId)
  }

  getMemberRequests(memberId:any){
    return this.http.get("https://localhost:7183/api/Request/GetMemberRequest/"+memberId)
  }

  getReceivedRequests(memberId:any){
    return this.http.get("https://localhost:7183/api/Request/GetReceivedRequest/"+memberId)
  }
}
