import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SegService } from 'Services/seg.sevice'; 
import { Segment } from 'Models/Segment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-gestion-segment',
  templateUrl: './gestion-segment.component.html',
  styleUrls: ['./gestion-segment.component.css']
})
export class GestionSegmentComponent implements OnInit {

 

 
 
 
    data: any[] = [];
    message: string = '';
    Search:string = '';
    filteredData: any[] = [];
    searchKeyword: string = '';
    constructor(private segservice:SegService,private router: Router) { }
  
    ngOnInit() {
      this.GetAll();
    }
  
  
  
  
  
    GetAll(){
      this.segservice.GetAll()
      .subscribe(data => {
        this.data = data;
      });
    }
    exportDataToExcel(): void {
      // Create a new array with the desired attributes
      const exportData = this.data.map(item => ({
        nom: item.nom,
        centreDeCout: item.centreDeCout,
        nomSegSapRef: item.nomSegSapRef,
        rhSegment: item.rhSegment,
        chefDeSegment: item.chefDeSegment
      }));
    
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Segments');
      XLSX.writeFile(workbook, 'segments.xlsx');
    }
    
    
    deleteItem(segmentId: number) {
      
     
      console.log(segmentId);
      
      if (confirm("Voulez-vous supprimer cet segment?")) {
        this.segservice.DeleteSeg(segmentId).subscribe(
          () => {
            this.GetAll();
            this.data = this.data.filter(s => s.chauffeurId !== segmentId);
            this.message = "Deleted";
          },
          error => {
            console.log(error);
           
            this.message = "Error";
          }
        );
      }
    }
    
    
    onSearch(searchTerm, segment: any) {
    
      if (segment) {
        const filteredData = this.data.filter((item) => {
          return item.segment.id === segment.id && item.title.includes(searchTerm);
        });
        this.filteredData = filteredData;
      } else {
        this.filteredData = this.data.filter((item) => {
          return item.title.includes(searchTerm);
        });
      }
    }
    
      
    navigateToAdd(segments:Segment): void {
      this.router.navigate(['/add-chauffeur']);
    }
    
   
   
  
  
  }
  
  
  
  
  
  
  
  
  
   
  
    
    
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
