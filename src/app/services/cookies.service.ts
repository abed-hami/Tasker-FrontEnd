import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor(private cookie:CookieService) { }

  setCookie(token:any,id:any) {
    this.deleteCookie()
    this.cookie.set('myToken',token)
    this.cookie.set('userId', id);
  }


  getCookieId() {
    const userId = this.cookie.get('userId');
    return userId
  }



  getCookieToken(){
    const  token=this.cookie.get('myToken')
    return token
  }


  deleteCookie() {
    this.cookie.deleteAll()
  }
}
