import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http:HttpClient) { }

  GetTaskComments(taskId:any){
    return this.http.get("https://localhost:7183/api/Comment/GetTaskComments/"+ taskId);
  }

  PostComment(comment : any){
    return this.http.post("https://localhost:7183/api/Comment",comment)
  }
}
