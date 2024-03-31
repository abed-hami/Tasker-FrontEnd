import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }

  createProject(project:any){
    return this.http.post("https://localhost:7183/api/Project",project)
  }

  getUserProjects(userId:any){
      return this.http.get("https://localhost:7183/api/Team/GetByMember/"+userId);
  }

  getCount(memberId:any,position:any){
    return this.http.get("https://localhost:7183/api/Project/GetCount/"+memberId+"/"+position)
  }

  getProjectTasks(memberId:any){
    return this.http.get("https://localhost:7183/api/Project/GetProjectTasks/"+memberId)
  }
}
