import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }

  signup(data:any){
    return this.http.post("https://localhost:7183/api/Member",data)
  }
}
