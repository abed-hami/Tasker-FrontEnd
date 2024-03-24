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
@Component({
    selector: 'app-projects-list',
    standalone: true,
    templateUrl: './projects-list.component.html',
    styleUrl: './projects-list.component.css',
    imports: [DialogModule, FormsModule, ToastrModule, DockComponent]
})
export class ProjectsListComponent {



  project:projects=new projects()
  visible: boolean = false;

  constructor(private Loginservice:LoginService, private projectService:ProjectService,private toastr:ToastService){

  }

  submit(){
    console.log(this.project);
  }


  id:any
  email:any;
    showDialog() {
        this.visible = true;
    }

    ngOnInit(){
      this.getUserInfo()

    }



    createProject(){

      this.projectService.createProject(this.project).subscribe(
        (data)=>{
              this.toastr.showSuccess("project created successfully!")
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

}

