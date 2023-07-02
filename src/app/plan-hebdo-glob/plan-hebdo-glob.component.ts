import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanSegmentService } from 'Services/PlanSegment.service'; 
import { PlanSegment } from 'Models/PlanSegment';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-plan-hebdo-glob',
  templateUrl: './plan-hebdo-glob.component.html',
  styleUrls: ['./plan-hebdo-glob.component.css']
})
export class PlanHebdoGlobComponent implements OnInit {
  DATA: any[] = [];
  data: any[] = [];
  message: string = '';
  Search:string = '';
  filteredData: any[] = [];
  searchKeyword: string = '';
  constructor(private PlanSegmentService:PlanSegmentService,private router: Router) { }

  ngOnInit() {
    this.GetAll();


    this.PlanSegmentService.GetAll()
    .subscribe(data => {
      this.DATA = data;
    });


    
  }




  


  GetAll(){
    this.PlanSegmentService.GetAll()
  .subscribe(data => {
    this.data = data.reduce((result, item) => {
      const { refSemaine, matricule, segment } = item;
      
      // Check if an entry with the same refSemaine already exists
      const existingEntry = result.find(entry => entry.refSemaine === refSemaine);
      
      if (existingEntry) {
        // Increment the count of matricule for the existing entry
        existingEntry.matriculeCount++;
      } else {
        // Create a new entry for the refSemaine
        result.push({
          refSemaine,
          matriculeCount: 1,
          segment
        });
      }
      
      return result;
    }, []);
  });

   
  }
  
  exportDataToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Vehicules');
    XLSX.writeFile(workbook, 'Vehicules.xlsx');
  }
  
  
  deleteItem(chauffeurId: string) {
    
   
    console.log(chauffeurId);
    
    if (confirm("Voulez-vous supprimer cet employé?")) {
      this.PlanSegmentService.DeletePlanSegment(chauffeurId).subscribe(
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
  
  
  onSearch(searchTerm, PlanSegment: any) {
  
    if (PlanSegment) {
      const filteredData = this.data.filter((item) => {
        return item.chauffeur.id === PlanSegment.id && item.title.includes(searchTerm);
      });
      this.filteredData = filteredData;
    } else {
      this.filteredData = this.data.filter((item) => {
        return item.title.includes(searchTerm);
      });
    }
  }
  
    
  navigateToAdd(PlanSegment:PlanSegment): void {
    this.router.navigate(['/add-vehicule']);
  }
  
  navigateToEdit(PlanSegment:PlanSegment): void {
    this.router.navigate(['/edit-vehicule', PlanSegment.refSemaine]);
  }
 

}
