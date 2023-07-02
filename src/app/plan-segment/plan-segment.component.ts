import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanSegmentService } from 'Services/PlanSegment.service'; 
import { PlanSegment } from 'Models/PlanSegment';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-plan-segment',
  templateUrl: './plan-segment.component.html',
  styleUrls: ['./plan-segment.component.css']
})
export class PlanSegmentComponent implements OnInit {

 
  data: any[] = [];
  message: string = '';
  Search:string = '';
  filteredData: any[] = [];
  searchKeyword: string = '';

  refSemaine:string = '';
  constructor(private PlanSegmentService:PlanSegmentService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {


    this.route.queryParams.subscribe(params => {
      this.refSemaine = params['refSemaine'];
      
      console.log(params);
     
    });



    this.GetAll(this.refSemaine );
  }





  GetAll(refSemaine: string) {
    this.PlanSegmentService.GetAll()
      .subscribe(data => {
        this.data = data.filter(item => item.refSemaine === refSemaine);
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
          this.GetAll(this.refSemaine );
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
