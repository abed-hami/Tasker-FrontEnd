import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http:HttpClient) { }

  sendRequest(request:any){
    return this.http.post("https://localhost:7183/api/Request",request)
  }
}
