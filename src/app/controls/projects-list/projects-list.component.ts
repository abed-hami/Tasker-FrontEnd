import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../../services/toast.service';
import { MessageService } from 'primeng/api';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { projects } from '../../models/project';
import { DockComponent } from "../../project-controls/dock/dock.component";
import { TeamService } from '../../services/team.service';
import { CookiesService } from '../../services/cookies.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
@Component({
    selector: 'app-projects-list',
    standalone: true,
    templateUrl: './projects-list.component.html',
    styleUrl: './projects-list.component.css',
    imports: [DialogModule, FormsModule, ToastrModule, DockComponent,CommonModule,RouterModule,DropdownModule]
})
export class ProjectsListComponent {
  selectedCity={name:"All"};
  invitations:any
  manager:any={
    projectId:0,
    memberId: this.cookie.getCookieId(),
    status: "accepted",
    position: "manager"
  }




  getInvitations(memberId:any){
    this.projectService.getInvitations(memberId).subscribe(
      (data)=>{
        this.invitations=data

      }
    )
  }

  project:projects=new projects()
  visible: boolean = false;
  projects:any

  pageSize = 4;
  pageNumber = 0;
  options: any
  get totalPages() {
    return Math.ceil(this.filteredProjects.length / this.pageSize);
  }


  searchTerm: string = '';


  get filteredProjects() {
    if (!this.searchTerm) {
      return this.projects;
    }

    return this.projects.filter((project: any) =>
      project.projectName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get paginatedProjects() {
    const start = this.pageNumber * this.pageSize;
    return (this.filteredProjects || []).slice(start, start + this.pageSize);
  }


  goToPage(page: number) {
    this.pageNumber = page;
  }


  get totalInvitedPages() {
    return Math.ceil(this.invitations.length / this.pageSize);
  }
  get paginatedInvitedProjects() {
    const start = this.pageNumber * this.pageSize;
    return (this.invitations || []).slice(start, start + this.pageSize);
  }

  goToPage2(page: number) {
    this.pageNumber = page;
  }

  visible2=false
  teamId:any

  showDialog2(id:any){
    this.teamId=id

    this.visible2=true
  }

  rejectInvitation(){
    this.projectService.rejectInvitation(this.teamId).subscribe(
      (data)=>{
        this.toastr.showError("Project Invitation Rejected")
        this.selectedCity.name='Invited'
        this.visible2=false
        this.getInvitations(this.cookie.getCookieId())
      }
    )
  }

  acceptInvitation(){
    this.projectService.acceptInvitation(this.teamId).subscribe(
      (data)=>{
        this.toastr.showSuccess("Project Invitation Accepted")
        this.selectedCity.name='All'
        this.visible2=false
        this.getProjectByMember(this.cookie.getCookieId())
      }
    )
  }

  setId(id:any){
    this.projectService.SetId(id)
    localStorage.setItem("projectId", id)
  }


  constructor(private Loginservice:LoginService, private projectService:ProjectService,private toastr:ToastService,private team:TeamService,private cookie:CookiesService,private router:Router){}

  submit(){
    console.log(this.project);
  }

  navigateto(position:any){
    localStorage.setItem("position", position)

  }


  id:any
  email:any;

  showAll=true
  showInvited=false
    showDialog() {
        this.visible = true;
    }

    ngOnInit(){
      this.getUserInfo()

      this.getInvitations(this.cookie.getCookieId())

      this.options = [

        { name: 'All' },
        { name: 'Invited' },



    ];
    }



    createProject(){

      this.projectService.createProject(this.project).subscribe(
        (data:any)=>{
              this.manager.projectId=data.id
              this.toastr.showSuccess("project created successfully!")
              this.addManager(this.manager)
              this.getUserInfo()
              this.visible=false

        },
        (error)=>{
          this.toastr.showError("project creation error!")
        }
      )
    }



    getUserInfo(){
      this.Loginservice.getUserInfo().subscribe(
        (data:any)=>{
          this.id=data.id
          this.getProjectByMember(this.id)
          this.email=data.email
          this.project.memberId=data.id
        },
        (error)=>{
          console.log(error)
        }
      )
    }

    addManager(manager:any){
      this.team.addTeamMember(manager).subscribe(
        (data:any)=>{

        },
        (error)=>{

        }

      )
    }

    getProjectByMember(id:any){
      this.projectService.getUserProjects(id).subscribe(
        (data)=>{
          this.projects=data

        }

      )
    }

}

