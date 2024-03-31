import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http:HttpClient) { }

  addTeamMember(member:any){
    return this.http.post("https://localhost:7183/api/Team",member)
  }

  
}
