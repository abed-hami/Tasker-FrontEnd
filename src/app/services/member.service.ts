import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http:HttpClient) { }

  getMemberById(id:any){
    return this.http.get("https://localhost:7183/api/Member/"+id)
  }


  getAllMembers(){
    return this.http.get("https://localhost:7183/api/Member")
  }

  updateUserInfo(userObject:any){
    return this.http.put("https://localhost:7183/api/Member/"+userObject.id,userObject)
  }

  updatePassword(id:any,oldPassword:any,newPassword:any){
    return this.http.put("https://localhost:7183/api/Member/UpdatePassword/"+id+"/"+oldPassword+"/"+newPassword,null)
  }
}
