import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CircuitService } from 'Services/circuit.sevice'; 
import { Circuit } from 'Models/Circuit';
import * as XLSX from 'xlsx';
declare var $: any;

@Component({
  selector: 'app-gestion-circuit',
  templateUrl: './gestion-circuit.component.html',
  styleUrls: ['./gestion-circuit.component.css']
})
export class GestionCircuitComponent implements OnInit {

  

 
 
 
    data: any[] = [];
    message: string = '';
    Search:string = '';
    filteredData: any[] = [];
    searchKeyword: string = '';
    constructor(private circuitservice:CircuitService,private router: Router) { }
  
    ngOnInit() {
      this.GetAll();
    }
  
  
  
  
  
    GetAll(){
      this.circuitservice.GetAll()
      .subscribe(data => {
        this.data = data;
      });
    }
    
    exportDataToExcel(): void {
      // Create a new array with the desired attributes
      const exportData = this.data.map(item => ({
        refSapLeoni: item.refSapLeoni,
        pointArrivee: item.pointArrivee,
        nbKm: item.nbKm,
        coutKm: item.coutKm,
        contributionEmploye: item.contributionEmploye,
        agence: item.agence,
        refChemin: item.refChemin
      }));
    
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'circuit');
      XLSX.writeFile(workbook, 'circuit.xlsx');
    }
    
    
    deleteItem(circuitId: number) {
      
     
      console.log(circuitId);
      
      if (confirm("Voulez-vous supprimer cet circuit?")) {
        this.circuitservice.DeleteCircuit(circuitId).subscribe(
          () => {
            this.GetAll();
            this.data = this.data.filter(s => s.circuitId !== circuitId);
            this.message = 'Circuit supprimé';
    
            this.showNotification('top', 'center', 'success',this.message);
          },
          error  => {
            if (error.error && error.error instanceof ErrorEvent) {
              // Client-side error
              this.message = error.error.message;
            } else if (error.error && typeof error.error === 'string') {
              // Backend returned an error message as a string
              this.message = error.error;
            } else {
              // Other types of errors
              this.message = 'Verifiez les types des entrées';
            }
        
           
            this.showNotification('top', 'center', 'danger',this.message);
          }
        );
      }
    }
    
    
    onSearch(searchTerm, circuit: any) {
    
      if (circuit) {
        const filteredData = this.data.filter((item) => {
          return item.circuit.id === circuit.id && item.title.includes(searchTerm);
        });
        this.filteredData = filteredData;
      } else {
        this.filteredData = this.data.filter((item) => {
          return item.title.includes(searchTerm);
        });
      }
    }
    
      
    navigateToAdd(circuits:Circuit): void {
      this.router.navigate(['/addchauf']);
    }
    
    navigateToEdit(circuit:Circuit): void {
      this.router.navigate(['/editchauf', circuit.id , circuit.refSapLeoni,circuit.refChemin,circuit.nbKm,
      circuit.contributionEmploye,circuit.coutKm,circuit.pointArrivee,circuit.agence]);
    }
  
  
  

    showNotification(from: string, align: string, type: string, message: string) {
    
  

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
  
  
  
  
  
  
  
  
  
   
  
    
    
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
