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

  getProjectAnnouncements(projectId:any){
    return this.http.get("https://localhost:7183/api/Announcement/GetByProjectId/"+projectId)
  }

  getById(id:any){
    return this.http.get("https://localhost:7183/api/Announcement/"+id)
  }

  delete(id:any){
    return this.http.delete("https://localhost:7183/api/Announcement/"+id)
  }

  updateAnnouncement(id:any,announcement: any){
    return this.http.put("https://localhost:7183/api/Announcement/"+id, announcement);
  }

  addAnnouncement(announcement:any){
    return this.http.post("https://localhost:7183/api/Announcement", announcement);
  }
}
