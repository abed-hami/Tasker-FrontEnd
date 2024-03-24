import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { login } from '../../models/login';
import { CookiesService } from '../../services/cookies.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {



  loginObject:login=new login()

  token:any

  useId:any


  constructor(private loginService: LoginService, private http:HttpClient,private router:Router,private cookieService:CookiesService) {}


  loginFunction(){
    const email = document.getElementById('email') as HTMLInputElement
    const pass = document.getElementById('password') as HTMLInputElement
    if(email.value==''||pass.value==''){
      alert("fill all fields")
    }
    else{
      this.loginService.Login(this.loginObject).subscribe((data)=>{
        console.log()
      this.token=data
      localStorage.setItem("myToken", this.token.token);


      this.router.navigate(["/dashboard"])
    })
    }

  }



}
