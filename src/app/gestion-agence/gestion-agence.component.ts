import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgenceService } from 'Services/agence.service'; 
import { Agence } from 'Models/Agence';
import * as XLSX from 'xlsx';
declare var $: any;
@Component({
  selector: 'app-gestion-agence',
  templateUrl: './gestion-agence.component.html',
  styleUrls: ['./gestion-agence.component.css']
})
export class GestionAgenceComponent implements OnInit {

 


 
 
 
    data: any[] = [];
    message: string = '';
    Search:string = '';
    filteredData: any[] = [];
    searchKeyword: string = '';
    constructor(private agenceservice:AgenceService,private router: Router) { }
  
    ngOnInit() {
      this.GetAll();
    }
  
  
  
  
  
    GetAll(){
      this.agenceservice.GetAllAgence()
      .subscribe(data => {
        this.data = data;
      });
    }
    exportDataToExcel(): void {
      // Create a new array with the desired attributes
      const exportData = this.data.map(item => ({
        nom: item.nom,
        adresse: item.adresse,
        telephone: item.telephone,
        matriculeFiscale: item.matriculeFiscale,
        siteInternet: item.siteInternet
      }));
    
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Agences');
      XLSX.writeFile(workbook, 'Agences.xlsx');
    }
    
    
    deleteItem(agenceID:string) {
      
     
      console.log(agenceID);
      
      if (confirm("Voulez-vous supprimer cette Agence?")) {
        this.agenceservice.DeleteAgence(agenceID).subscribe(
          () => {
            this.GetAll();
            this.data = this.data.filter(s => s.agenceID !== agenceID);
            this.message="Agence supprimé"
            this.showNotification('top', 'center', 'success',this.message);
          },
          error => {
          console.log("il existe des chauffeur ou des vehicules liée a cette agences vous devez les supprimer avant ")
           
            this.message = "il existe des chauffeur ou des vehicules liée a cette agences vous devez les supprimer avant";
            this.showNotification('top', 'center', 'danger',this.message);
          }
        );
      }
    }
    
    
    onSearch(searchTerm, agence: any) {
    
      if (agence) {
        const filteredData = this.data.filter((item) => {
          return item.chauffeur.id === agence.id && item.title.includes(searchTerm);
        });
        this.filteredData = filteredData;
      } else {
        this.filteredData = this.data.filter((item) => {
          return item.title.includes(searchTerm);
        });
      }
    }
    
      
  
     

    showNotification(from: string, align: string, type: string,message:string) {
     
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
  
  
  
  
  
  
  
  
  
   
  
    
    
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
