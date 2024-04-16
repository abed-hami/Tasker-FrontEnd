import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubtasksService {

  constructor(private http:HttpClient) { }

  getSubTaskByTaskId(taskId:any){
    return this.http.get("https://localhost:7183/api/SubTask/GetSubTasksByTaskId/"+taskId)
  }

  updateStatus(subTaskId:any){
    return this.http.put("https://localhost:7183/api/SubTask/UpdateStatus/"+subTaskId,null);
  }

  getCount(taskId:any){
    return this.http.get("https://localhost:7183/api/SubTask/GetAllCount/"+taskId)
  }

  getCompletedCount(taskId:any){
    return this.http.get("https://localhost:7183/api/SubTask/GetCompletedCount/"+taskId)
  }

  getProgress(taskId:any){
    return this.http.get("https://localhost:7183/api/SubTask/GetProgress/"+taskId)
  }

  addSubTask(subtask:any){
    return this.http.post("https://localhost:7183/api/SubTask",subtask)
  }
}
