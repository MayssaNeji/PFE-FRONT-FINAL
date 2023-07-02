import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChauffeurService } from 'Services/chauffeur.service'; 
import { Chauffeur } from 'Models/Chauffeur';
import * as XLSX from 'xlsx';
import { ShiftService } from 'Services/Shift.service';


@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.css']
})
export class ShiftsComponent implements OnInit {

 
 
 
  data: any[] = [];
  message: string = '';
  Search:string = '';
  filteredData: any[] = [];
  searchKeyword: string = '';
  constructor(private chaufservice:ShiftService,private router: Router) { }

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
    const worksheet = XLSX.utils.json_to_sheet(this.data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'shifts');
    XLSX.writeFile(workbook, 'shifts.xlsx');
  }
  
  
  deleteItem(chauffeurId: string) {
    
   
    console.log(chauffeurId);
    
    if (confirm("Voulez-vous supprimer cet shift?")) {
      this.chaufservice.DeleteShift(chauffeurId).subscribe(
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


