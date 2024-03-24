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
}
