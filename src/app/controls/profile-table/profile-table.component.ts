import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { MemberService } from '../../services/member.service';
import { CookiesService } from '../../services/cookies.service';
import { ToastService } from '../../services/toast.service';
import { Member } from '../../models/member';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-profile-table',
  standalone: true,
  imports: [FormsModule,CommonModule,DialogModule],
  templateUrl: './profile-table.component.html',
  styleUrl: './profile-table.component.css'
})
export class ProfileTableComponent {
  visible=false
  members:any
  type='password'
  id:any
  member:any
  uploading = false;
  oldPassword:any
  newPassword:any
  confirmedPassword:any=""

  userObject:Member=new Member()

  constructor(private loginService:LoginService,private memberService:MemberService,private cookieService:CookiesService, private toast:ToastService) {}

  showDialog(){
    this.visible=true
  }

  passwordMismatch(){
    if(this.confirmedPassword!="" &&this.newPassword!=this.confirmedPassword){
      return true
    }
    return false
  }

  updatePassword(){

      this.memberService.updatePassword(this.userObject.id,this.oldPassword,this.newPassword).subscribe((data)=>{
      this.toast.showSuccess("Password Updated!")


    },(error)=>{
      this.toast.showError("Wrong Password")
    }

  )



  }

  profilePic:any

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.uploading=true
    this.profilePic=file

  }

  isValidLength(){
    if(this.newPassword && this.newPassword.length <8){
      return false
    }
    return true
  }

  fieldsEmpty(): boolean {
    return !this.oldPassword || !this.newPassword || !this.confirmedPassword;
  }




  getMemberInfoById(id:any){
    this.memberService.getMemberById(id).subscribe(
      (data:any)=>{
        this.member=data
        this.userObject.id=data.id
        this.userObject.email=data.email
        this.userObject.firstName=data.firstName
        this.userObject.lastName=data.lastName
        this.userObject.position=data.position
        this.userObject.picture =data.picture

        console.log(data)
      }
    )
  }

  updateUserInfo(){
    this.memberService.updateUserInfo(this.userObject).subscribe(
      (data)=>{

        this.toast.showSuccess("User Info Updated Successfully!")
        this.getMemberInfoById(this.userObject.id)
      }
    )


  }

  update(){
    this.memberService.upload(this.profilePic).subscribe(
      (response:any) => {

        this.userObject.picture=response.url
        this.updateUserInfo()
      },
      (error) => {
        console.error('Error uploading file:', error);

      }
    );
  }

  ngOnInit(){
    this.id=this.cookieService.getCookieId()
    this.getMemberInfoById(this.id);
  }
}
