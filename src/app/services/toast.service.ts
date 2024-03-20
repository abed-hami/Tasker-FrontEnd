import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { animation } from '@angular/animations';
import { __values } from 'tslib';
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr:ToastrService) { }

  showSuccess(details:any) {
   return this.toastr.success(details,"Success",{closeButton:true});
}

showInfo(details:any) {
    return this.toastr.info(details,"Info",{closeButton:true});
}

showWarn(details:any) {
    return this.toastr.warning(details,"Warning",{closeButton:true});
}

showError(details:any) {
    return this.toastr.error(details,"Error",{closeButton:true});
}
}
