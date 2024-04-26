import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  assignTask(task:any){
    return this.http.post("https://localhost:7183/api/Task",task)
  }

  getUserTasks(id:any){
    return this.http.get('https://localhost:7183/api/Task/GetUserTask/'+id)
  }

  getTaskById(id:any){
    return this.http.get("https://localhost:7183/api/Task/"+id)
  }

  updateTask(object:any){
    return this.http.put("https://localhost:7183/api/Task/"+object.id,object)
  }

  getProjectTaskCount(id:any){
    return this.http.get("https://localhost:7183/api/Task/GetProjectTaskCount/"+id)
  }

  checkBudget(id:any,amount:any){
    return this.http.get('https://localhost:7183/api/Task/IsSufficientBudget/'+id+"/"+amount);
  }
  updateStatus(id:any){
    return this.http.put("https://localhost:7183/api/Task/UpdateTaskStatus/"+id,null)
  }

  getCountByStatus(id:any,status:any){
    return this.http.get("https://localhost:7183/api/Task/GetCountByStatus/"+id+ "/" + status);
  }

  getProjectCountByStatus(id:any,status:any){
    return this.http.get("https://localhost:7183/api/Task/GetProjectCountByStatus/"+id+ "/" + status);
  }

  getCountByPriority(id:any,priority:any){
    return this.http.get("https://localhost:7183/api/Task/GetCountByPriority/"+id+ "/" + priority);
  }

  UpdateTaskStatus(id:any,status:any){
    return this.http.put("https://localhost:7183/api/Task/UpdateStatus/"+id+"/"+status,null)
  }

  getTasksForManager(id:any,status:any){
    return this.http.get("https://localhost:7183/api/Task/GetProjectForManager/"+id+"/"+status)
  }

  getProjectTasks(id:any,projectId:any,status:string){
    return this.http.get("https://localhost:7183/api/Task/GetProjectTask/"+id+"/"+projectId+"/"+status)
  }
}
