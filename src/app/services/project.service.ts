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
}
