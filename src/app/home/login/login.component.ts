import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { login } from '../../models/login';
import { CookiesService } from '../../services/cookies.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {



  loginObject:login=new login()

  token:any

  useId:any


  constructor(private loginService: LoginService, private http:HttpClient,private router:Router,private cookieService:CookiesService,private toast:ToastService) {}


  loginFunction(){
    const email = document.getElementById('email') as HTMLInputElement
    const pass = document.getElementById('password') as HTMLInputElement
    if(email.value==''||pass.value==''){
      this.toast.showWarn("Fill all fields")
    }
    else{
      this.loginService.Login(this.loginObject).subscribe((data)=>{
        console.log()
      this.token=data
      localStorage.setItem("myToken", this.token.token);


        this.router.navigate(['/dashboard'])

    },
  (error)=>{
    this.toast.showWarn("Wrong email or password")
  })
    }

  }

  id:any







}
