import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  public files: NgxFileDropEntry[] = [];
  public allOpenedFiles :Array<any> =[];
  errorMessage;
  hideClose = true;
  
  constructor() { }

  ngOnInit(): void {
  }
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
         
            const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
            fileEntry.file((file: File) => {
    
              console.log(droppedFile.relativePath, file);
              if(file.size < 2097152 && this.isFileAllowed(droppedFile.relativePath)){
                  this.allOpenedFiles.push(file);
                  this.errorMessage = false;
              }else{
                this.files =[];
                this.errorMessage = true;
              }
            
    
            });
         
       
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }
  deleteFile(filename, index){
  for(let i=0; i<this.allOpenedFiles.length; i++){
    if(this.allOpenedFiles[i].name === filename.name && i==index){
        delete this.allOpenedFiles[i];
        this.hideClose= false;
    }
    this.hideClose= true;
  }
  }
  isFileAllowed(fileName: string) {
    let isFileAllowed = false;
    const allowedFiles = ['.pdf', '.jpg', '.jpeg', '.png'];
    const regex = /(?:\.([^.]+))?$/;
    const extension = regex.exec(fileName);
    if (undefined !== extension && null !== extension) {
      for (const ext of allowedFiles) {
        if (ext === extension[0]) {
          isFileAllowed = true;
        }
      }
    }
    return isFileAllowed;
  }

}
