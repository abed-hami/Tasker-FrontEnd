import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  getUserTasks(id:any){
    return this.http.get('https://localhost:7183/api/Task/GetUserTask/'+id)
  }

  updateStatus(id:any){
    return this.http.put("https://localhost:7183/api/Task/UpdateStatus/"+id,null)
  }

  getCountByStatus(id:any,status:any){
    return this.http.get("https://localhost:7183/api/Task/GetCountByStatus/"+id+ "/" + status);
  }

  getCountByPriority(id:any,priority:any){
    return this.http.get("https://localhost:7183/api/Task/GetCountByPriority/"+id+ "/" + priority);
  }
}
