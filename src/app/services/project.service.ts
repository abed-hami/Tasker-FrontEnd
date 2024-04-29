import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }

  id:any

  createProject(project:any){
    return this.http.post("https://localhost:7183/api/Project",project)
  }

  updateProject(project:any){
    return this.http.put("https://localhost:7183/api/Project/"+project.id,project)
  }


  getUserProjects(userId:any,status:any){
      return this.http.get("https://localhost:7183/api/Team/GetByMember/"+userId+"/"+status);
  }

  getProject(id:any){
    return this.http.get("https://localhost:7183/api/Project/"+id)
  }

  getInvitationsCount(memberId:any){
    return this.http.get("https://localhost:7183/api/Project/GetInvitationsCount/"+memberId)
  }

  getCount(memberId:any,position:any){
    return this.http.get("https://localhost:7183/api/Project/GetCount/"+memberId+"/"+position)
  }

  rejectInvitation(invitationId:any){
    return this.http.delete("https://localhost:7183/api/Team/"+invitationId)
  }

  acceptInvitation(id:any){
    return this.http.put("https://localhost:7183/api/Team/AcceptInvitation/"+id,null)
  }
  getProjectTasks(memberId:any){
    return this.http.get("https://localhost:7183/api/Project/GetProjectTasks/"+memberId)
  }

  getInvitations(memberId:any){
    return this.http.get("https://localhost:7183/api/Team/GetInvitationsByMember/"+memberId)
  }

   SetId(id:any){
    this.id=id
  }

   GetId(){
    return this.id
  }
}
