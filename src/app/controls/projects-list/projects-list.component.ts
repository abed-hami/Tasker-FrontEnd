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
@Component({
    selector: 'app-projects-list',
    standalone: true,
    templateUrl: './projects-list.component.html',
    styleUrl: './projects-list.component.css',
    imports: [DialogModule, FormsModule, ToastrModule, DockComponent,CommonModule,RouterModule]
})
export class ProjectsListComponent {

  manager:any={
    projectId:0,
    memberId: this.cookie.getCookieId(),
    status: "accepted",
    position: "manager"
  }




  project:projects=new projects()
  visible: boolean = false;
  projects:any

  pageSize = 3;
  pageNumber = 0;
  get totalPages() {
    return Math.ceil(this.projects.length / this.pageSize);
  }
  get paginatedProjects() {
    const start = this.pageNumber * this.pageSize;
    return (this.projects || []).slice(start, start + this.pageSize);
  }

  goToPage(page: number) {
    this.pageNumber = page;
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
    showDialog() {
        this.visible = true;
    }

    ngOnInit(){
      this.getUserInfo()
      this.getProjectByMember()
    }



    createProject(){

      this.projectService.createProject(this.project).subscribe(
        (data:any)=>{
              this.manager.projectId=data.id
              this.toastr.showSuccess("project created successfully!")
              this.addManager(this.manager)
              this.getProjectByMember()

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

    getProjectByMember(){
      this.projectService.getUserProjects(this.cookie.getCookieId()).subscribe(
        (data)=>{
          this.projects=data

        }

      )
    }

}

