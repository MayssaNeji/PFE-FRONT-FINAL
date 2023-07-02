import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeService } from 'Services/Employe.service';
declare var $: any;
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-gestion-employe',
  templateUrl: './gestion-employe.component.html',
  styleUrls: ['./gestion-employe.component.css']
})
export class GestionEmployeComponent implements OnInit {
  data: any[] = [];
  message: string = '';
  constructor(private empService:EmployeService) { }

  ngOnInit(): void {
    this.empService.GetAll().subscribe(data => {
      this.data = data;
    });
  }

 
  exportDataToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'employe');
    XLSX.writeFile(workbook, 'employe.xlsx');
  }
  




  deleteItem(matricule: number) {
      
     
    console.log(matricule);
    
    if (confirm("Voulez-vous supprimer cet employé?")) {
      this.empService.DeleteEmploye(matricule).subscribe(
        () => {
          this.empService.GetAll();
          this.data = this.data.filter(s => s.matricule !== matricule);
          this.message = "Deleted";
          this.showNotification('top', 'center', 'success');
        },
        error => {
          console.log(error);
          this.showNotification('top', 'center', 'danger');
          this.message = "Error";
        }
      );
    }
  }


  showNotification(from: string, align: string, type: string) {
    let message: string;
  
    if (type === 'success') {
      message = 'employé supprimé ';
    } else if (type === 'danger') {
      message = 'cet employés existe dans les planifications des segments,modifier la planification avant ';
    }
  
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