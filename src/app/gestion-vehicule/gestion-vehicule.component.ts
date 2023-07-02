import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehiculeService } from 'Services/vehicule.service'; 
import { Vehicule } from 'Models/Vehicule';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-gestion-vehicule',
  templateUrl: './gestion-vehicule.component.html',
  styleUrls: ['./gestion-vehicule.component.css']
})
export class GestionVehiculeComponent implements OnInit {

 
 
 
 
    data: any[] = [];
    message: string = '';
    Search:string = '';
    filteredData: any[] = [];
    searchKeyword: string = '';
    constructor(private vehiculeservice:VehiculeService,private router: Router) { }
  
    ngOnInit() {
      this.GetAll();
    }
  

    GetAll(){
      this.vehiculeservice.GetAll()
      .subscribe(data => {
        this.data = data;
      });
    }
    
    exportDataToExcel(): void {
      // Create a new array with the desired attributes
      const exportData = this.data.map(item => ({
        nomDeReference: item.nomDeReference,
        type: item.type,
        dateDeMiseEnRoute: item.dateDeMiseEnRoute,
        capacite: item.capacite,
        numSerie: item.numSerie,
        agence: item.agence
      }));
    
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Vehicules');
      XLSX.writeFile(workbook, 'Vehicules.xlsx');
    }
    
    
    deleteItem(chauffeurId: number) {
      
     
      console.log(chauffeurId);
      
      if (confirm("Voulez-vous supprimer cet Vehicule?")) {
        this.vehiculeservice.Deletevehicule(chauffeurId).subscribe(
          () => {
            this.GetAll();
            this.data = this.data.filter(s => s.chauffeurId !== chauffeurId);
            this.message = "Deleted";
          },
          error => {
            console.log(error);
           
            this.message = "Error";
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
    
      
    navigateToAdd(chauffeurs:Vehicule): void {
      this.router.navigate(['/add-vehicule']);
    }
    
   
  
  }
  
  
  
  
  
  
  
  
  
   
  
    
    
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
