import { Component } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { DialogModule } from 'primeng/dialog';
import { Team } from '../../models/team';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MemberService } from '../../services/member.service';
import { ToastService } from '../../services/toast.service';
import { filter } from 'rxjs';
@Component({
  selector: 'app-member-page',
  standalone: true,
  imports: [CommonModule,DialogModule,FormsModule,DropdownModule],
  templateUrl: './member-page.component.html',
  styleUrl: './member-page.component.css'
})
export class MemberPageComponent {

  constructor(private teamService:TeamService,private route: ActivatedRoute,private projectService:ProjectService, private member:MemberService,private toast:ToastService){}
  position:any
  teamInvitation:Team=new Team()
  projectId:any
  visible=false
  members:any
  allMembers:any
  email:any




  ngOnInit(){
    this.position=localStorage.getItem('position')
    this.projectId=localStorage.getItem("projectId")
    this.getTeamByProject(this.projectId)
    this.getAllMembers()

  }

  showDialog(){
    this.visible=true
  }



  addMember(){
    this.teamInvitation.projectId=this.projectId
    this.teamInvitation.status="invited"
    console.log(this.teamInvitation)
    if(this.teamInvitation.memberId!= null && !this.teamInvitation.position!=null){
      this.teamService.addTeamMember(this.teamInvitation).subscribe(

      (data)=>{
        this.toast.showSuccess("Member Invited Successfully!")
        this.visible=false
        this.ngOnInit()
      },
      (error)=>{
        this.toast.showError("Error Inviting Member!")
      }
    )
    }
    else{
      this.toast.showWarn("Please fill in all fields.")
    }

  }



  filterEmail(event: any) {
    const searchText = (event as HTMLInputElement).value.toLowerCase(); // Access input value

    this.email = this.allMembers.filter((value: any) =>
      value.email.toLowerCase().includes(searchText)
    );


}





  getAllMembers(){
    this.member.getAllMembers().subscribe(
      (data)=>{
        this.allMembers=data
        console.log(data)
      }
    )
  }


  team:any
  pageSize = 5;
  pageNumber = 0;
  get totalPages() {
    return Math.ceil(this.team.length / this.pageSize);
  }
  get paginatedTeam() {
    const start = this.pageNumber * this.pageSize;
    return (this.team || []).slice(start, start + this.pageSize);
  }
  goToPage(page: number) {
    this.pageNumber = page;
  }

  getTeamByProject(id:any){
    this.teamService.getProject(id).subscribe(
      (data)=>{
        this.team=data

      }
    )
  }
}
