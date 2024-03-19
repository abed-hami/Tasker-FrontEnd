import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObject:any={
    email:'',
    password:''
  }

  token:any


  constructor(private loginService: LoginService, private http:HttpClient,private router:Router) {}


  loginFunction(){
    const email = document.getElementById('email') as HTMLInputElement
    const pass = document.getElementById('password') as HTMLInputElement
    if(email.value==''||pass.value==''){
      alert("fill all fields")
    }
    else{
      this.loginService.Login(this.loginObject).subscribe((data)=>{


      this.token=data
      localStorage.setItem( "myToken", this.token.token);
      this.router.navigate(["/dashboard"])
    })
    }

  }

}
