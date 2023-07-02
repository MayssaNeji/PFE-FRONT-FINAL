import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChauffeurService } from 'Services/chauffeur.service'; 
import { Chauffeur } from 'Models/Chauffeur';
import * as XLSX from 'xlsx';
declare var $: any;
@Component({
  selector: 'app-gestion-chauffeur',
  templateUrl: './gestion-chauffeur.component.html',
  styleUrls: ['./gestion-chauffeur.component.css']
})
export class GestionChauffeurComponent implements OnInit {

 
 
 
    data: any[] = [];
    message: string = '';
    Search:string = '';
    filteredData: any[] = [];
    searchKeyword: string = '';
    constructor(private chaufservice:ChauffeurService,private router: Router) { }
  
    ngOnInit() {
      this.GetAll();
    }
  
  
  
  
  
    GetAll(){
      this.chaufservice.GetAll()
      .subscribe(data => {
        this.data = data;
      });
    }
    
    exportDataToExcel(): void {
      // Create a new array with the desired attributes
      const exportData = this.data.map(item => ({
        nom: item.nom,
        prenom: item.prenom,
        dateDeNaissance: item.dateDeNaissance,
        telephone: item.telephone,
        agence: item.agence
      }));
    
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'chauffeurs');
      XLSX.writeFile(workbook, 'chauffeurs.xlsx');
    }
    
    deleteItem(chauffeurId: number) {
      
     
      console.log(chauffeurId);
      
      if (confirm("Voulez-vous supprimer cet chauffeur?")) {
        this.chaufservice.DeleteChauf(chauffeurId).subscribe(
          () => {
            this.GetAll();
            this.data = this.data.filter(s => s.chauffeurId !== chauffeurId);
            this.message = "Deleted";
            this.showNotification('top', 'center', 'success',this.message);
          },
          error => {
            console.log(error);
            this.message = "erreur de suppression";
            this.showNotification('top', 'center', 'danger',this.message);
           
          }
        );
      }
    }
    
    
    onSearch(searchTerm, chauffeur: any) {
    
      if (chauffeur) {
        const filteredData = this.data.filter((item) => {
          return item.chauffeur.id === chauffeur.id && item.title.includes(searchTerm);
        });
        this.filteredData = filteredData;
      } else {
        this.filteredData = this.data.filter((item) => {
          return item.title.includes(searchTerm);
        });
      }
    }
    
      
   


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
  
  
  
  
  
  
  
  
  
   
  
    
    
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  