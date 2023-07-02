import { Component, OnInit } from '@angular/core';
import { CircuitService } from 'Services/circuit.sevice';
import { AgenceService } from 'Services/agence.service';
import { Circuit } from 'Models/Circuit';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { StationService } from 'Services/Station.service';
declare var $: any;

@Component({
  selector: 'app-add-circuit',
  templateUrl: './add-circuit.component.html',
  styleUrls: ['./add-circuit.component.css']
})
export class AddCircuitComponent  {

  message: string='';
  ok: boolean=true;

  agences: any[] = [];
  stations: any[] = [];

  chauffeurForm: FormGroup = new FormGroup({
    refSapLeoni: new FormControl('', Validators.required),
    refChemin: new FormControl('', Validators.required),
    pointArrivee: new FormControl('', Validators.required),
    nbKm: new FormControl('', Validators.required),
    contributionEmploye: new FormControl('', Validators.required),
    agence: new FormControl('', Validators.required),
    coutKm : new FormControl('', Validators.required),
   
  
  });

  constructor(
    private chauffeur:CircuitService,
    private agenceService: AgenceService,
    private station:StationService
    
  ) { 
    this.agenceService.GetAllAgence().subscribe(data => {
      this.agences = data;
    });




    this.station.GetAll().subscribe(DATA => {
      this.stations = DATA;
    });
  }







  
  Createchauf() {
    // check if form is valid
    if (this.chauffeurForm.invalid) {
      console.log('Form is invalid');
      console.log(this.chauffeurForm.controls['refSapLeoni'].errors);
      console.log(this.chauffeurForm.controls['pointArrivee'].errors);
      console.log(this.chauffeurForm.controls['nbKm'].errors);
      console.log(this.chauffeurForm.controls['contributionEmploye'].errors);
      console.log(this.chauffeurForm.controls['agence'].errors);
      // add console.log statements for each control that you want to check
      return;
    }
    this.chauffeurForm.valueChanges.subscribe(val => {
      console.log(val);
    });
    
  
    // get selected agence
    const agenceId = this.chauffeurForm.controls['agence'].value;
    if (!agenceId) {
      console.log('Agence not selected');
      return;
    }
  
    // retrieve agence data
    this.agenceService.SearchAgence(agenceId).pipe(
      map(data => {
        return {
          nom: data.nom,
          adresse: data.adresse,
          telephone: data.telephone,
          matriculeFiscale: data.matriculeFiscale,
          chauffeurs: null,
          Circuit: null,
          
          Vehicule: null



          
        };
        
      })
    ).subscribe(agence => {
      // create new chauffeur object
      const newChauffeur: Circuit = {
        refSapLeoni: this.chauffeurForm.controls['refSapLeoni'].value,
        pointArrivee: this.chauffeurForm.controls['pointArrivee'].value,
        nbKm: this.chauffeurForm.controls['nbKm'].value,
        coutKm : this.chauffeurForm.controls['coutKm'].value,
        contributionEmploye: this.chauffeurForm.controls['contributionEmploye'].value,
        agence:  this.chauffeurForm.controls['agence'].value,
        refChemin:  this.chauffeurForm.controls['refChemin'].value,
    
      };
  



      







      // call createchauf method of chauffeur service
      this.chauffeur.CreateCircuit(newChauffeur).subscribe(() => {
       
        this.message = 'Circuit ajouté avec succès';
    
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
      });
    });
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
