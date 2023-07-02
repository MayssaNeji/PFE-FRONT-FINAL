import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeService } from 'Services/Employe.service';
declare var $: any;
@Component({
  selector: 'app-import-employe',
  templateUrl: './import-employe.component.html',
  styleUrls: ['./import-employe.component.css']
})
export class ImportEmployeComponent implements OnInit {
  data: any[] = [];
  message: string;
  constructor(private empService:EmployeService) { }

  ngOnInit(): void {
    this.empService.GetAll().subscribe(data => {
      this.data = data;
    });
  }

 
upload(fileInput: any) {
  this.empService.uploadEmpList(fileInput).subscribe(
    response => {
      console.log('File uploaded successfully:', response);
      this.message = 'fichier importé avec succès';
     
      this.showNotification('top', 'center', 'success', this.message);
    }, error => {
      if (error.error && error.error instanceof ErrorEvent) {
        // Client-side error
        this.message = error.error.message;
      } else if (error.error && typeof error.error === 'string') {
        // Backend returned an error message as a string
        this.message = error.error;
      } else {
        // Other types of errors
        this.message = 'Verifiez le type du fichier ';
      }
      this.showNotification('top', 'center', 'danger',this.message);
    }
  )};



  showNotification(from: string, align: string, type: string,message: string) {
    
    $.notify(
      {
        icon: "notifications",
        message: message
      },
      {
        type: type,
        timer: 3000,
        placement: {
          from: from,
          align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss"><i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      }
    );
  }



}