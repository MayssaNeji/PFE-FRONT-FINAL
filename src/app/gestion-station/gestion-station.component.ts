import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StationService } from 'Services/Station.service'; 
import { Station } from 'Models/Station';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-gestion-station',
  templateUrl: './gestion-station.component.html',
  styleUrls: ['./gestion-station.component.css']
})
export class GestionStationComponent implements OnInit {

 

 
 
 
    data: any[] = [];
    message: string = '';
    Search:string = '';
    filteredData: any[] = [];
    searchKeyword: string = '';
    constructor(private StationService:StationService,private router: Router) { }
  
    ngOnInit() {
      this.GetAll();
    }
  
  
  
  
  
    GetAll(){
      this.StationService.GetAll()
      .subscribe(data => {
        this.data = data;
      });
    }
    
    exportDataToExcel(): void {
      // Create a new array with the desired attributes
      const exportData = this.data.map(item => ({
        referenceRegion: item.referenceRegion,
        refSapLeoni: item.refSapLeoni,
        longitude: item.longitude,
        latitude: item.latitude,
        rayon: item.rayon
      }));
    
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Stations');
      XLSX.writeFile(workbook, 'Stations.xlsx');
    }
    
    
    
    deleteItem(chauffeurId: number) {
      
     
      console.log(chauffeurId);
      
      if (confirm("Voulez-vous supprimer cet station?")) {
        this.StationService.DeleteStation(chauffeurId).subscribe(
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
    
   
  
  }
  
  
  
  
  
  
  
  
  
   
  
    
    
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
