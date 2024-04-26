import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsHubService {

  constructor(private http:HttpClient) {

  }

  getUserNotification(memberId:any){
    return this.http.get("https://localhost:7183/api/Notification/GetUserNotification/"+memberId)
  }

  deleteNotification(id:any){
    return this.http.delete("https://localhost:7183/api/Notification/"+id)
  }

  getNotificationCount(memberId:any){
    return this.http.get("https://localhost:7183/api/Notification/GetNotificationCount/"+memberId)
  }

  updateStatus(id:any){
    return this.http.put("https://localhost:7183/api/Notification/UpdateNotificationStatus/"+id,null);
  }
}
