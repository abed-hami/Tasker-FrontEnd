import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(private http:HttpClient) { }

  getAnnouncementByMember(memberId:any){
    return this.http.get("https://localhost:7183/api/Announcement/GetByMemberId/"+memberId)
  }
}
