import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUploadedService {

  constructor(private http:HttpClient) { }

  uploadFile(fileObject:any){
    return this.http.post("https://localhost:7183/api/FilesUploaded",fileObject)
  }

  getFilesByTaskId(taskId:any){
    return this.http.get("https://localhost:7183/api/FilesUploaded/GetFilesUploadedsByTask/"+taskId)
  }

  removeFile(id:any){
    return this.http.delete("https://localhost:7183/api/FilesUploaded")
  }
}
