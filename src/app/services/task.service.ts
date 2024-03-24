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
}
