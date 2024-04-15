import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {

  constructor(private http:HttpClient) { }

  getList(id:any,status:any){
    return this.http.get("https://localhost:7183/api/ToDo/GetByStatus/"+id+"/"+status)
  }

  updateStatus(id:any, status:any){
    return this.http.put("https://localhost:7183/api/ToDo/updateStatus/"+id+"/"+status,null)
  }

  addToDo(object:any){
    return this.http.post("https://localhost:7183/api/ToDo",object)
  }

  delete(id:any){
    return this.http.delete("https://localhost:7183/api/ToDo/"+id)
  }
}
