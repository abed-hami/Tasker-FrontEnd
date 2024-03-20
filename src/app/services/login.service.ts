import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',

})
export class LoginService {

  constructor(private http:HttpClient) {

  }

  loginUrl="https://localhost:7183/api/Member/Login";

  Login(member:any){
    return this.http.get(this.loginUrl+"/"+member.email+"/"+member.password);
  }

  getToken(){
    return localStorage.getItem("myToken");
  }

 getUserInfo(){
  return this.http.get("https://localhost:7183/api/Member/GetLoggedInUser");
 }
}
