import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanHebdoService } from 'Services/PlanHedo.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-view-plan-hebdo',
  templateUrl: './view-plan-hebdo.component.html',
  styleUrls: ['./view-plan-hebdo.component.css']
})
export class ViewPlanHebdoComponent implements OnInit {



  data: any[] = [];
  refSemaine:string = '';
  constructor(private router: Router, private route: ActivatedRoute,private PlanHedo: PlanHebdoService,) { }

  ngOnInit(): void {
   
    this.route.queryParams.subscribe(params => {
      this.refSemaine = params['refSemaine'];
      
      console.log(params);
     
    });
    this.GetAll(this.refSemaine);

  }



  GetAll(refSemaine: string) {
    this.PlanHedo.GetAll()
      .subscribe(data => {
        this.data = data.filter(item => item.refSemaine.trim()  === refSemaine.trim() );
        
      console.log( this.data);
      });
  }
  

  exportDataToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Vehicules');
    XLSX.writeFile(workbook, 'Vehicules.xlsx');
  }
  

}
