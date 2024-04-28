import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignupService } from '../../services/signup.service';
import { signup } from '../../models/signup';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  registerObject:signup = new signup()

  constructor(private http:HttpClient, private signupService:SignupService,private toast:ToastService){}

  validateAndSignup(signupForm:any) {
    if (signupForm.invalid) {
      this.toast.showWarn("Please fill out all required fields correctly.");
      signupForm.reset()
      return;
    }
    this.signup(signupForm);
  }


  signup(signupForm:any){
    const lname  = document.getElementById( "lname" ) as HTMLInputElement;
    const fname  = document.getElementById( "fname" ) as HTMLInputElement;
    const email  = document.getElementById( "email" ) as HTMLInputElement;
    const pass  = document.getElementById( "password" ) as HTMLInputElement;
    const position  = document.getElementById( "position" ) as HTMLInputElement;

    if(lname.value==="" || fname.value==="" || email.value===''||pass.value===''||position.value===''){
      
    }
    else{
       this.signupService.signup(this.registerObject).subscribe(
      (data:any)=>{

        this.toast.showSuccess("member created successfully")
        signupForm.reset()
      },
      (error:any)=>{
        this.toast.showError("error in registration")

      }
    )

    }

  }

}
