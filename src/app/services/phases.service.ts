import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhasesService {

  constructor(private http:HttpClient) { }

  getProjectPhases(id:any){
    return this.http.get("https://localhost:7183/api/Phase/GetProjectPhases/"+id)
  }
}
