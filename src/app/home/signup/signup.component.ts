import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignupService } from '../../services/signup.service';
import { signup } from '../../models/signup';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  registerObject:signup = new signup()

  constructor(private http:HttpClient, private signupService:SignupService){}



  signup(){
    const lname  = document.getElementById( "lname" ) as HTMLInputElement;
    const fname  = document.getElementById( "fname" ) as HTMLInputElement;
    const email  = document.getElementById( "email" ) as HTMLInputElement;
    const pass  = document.getElementById( "password" ) as HTMLInputElement;
    const position  = document.getElementById( "position" ) as HTMLInputElement;

    if(lname.value==="" || fname.value==="" || email.value===''||pass.value===''||position.value===''){
      alert("please fill all forms")
    }else{
       this.signupService.signup(this.registerObject).subscribe(
      (data:any)=>{

        alert("member created successfully")
      },
      (error:any)=>{
        alert("error in registration")
      }
    )

    }

  }

}
