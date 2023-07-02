import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChauffeurService } from 'Services/chauffeur.service'; 

import { ActivatedRoute } from '@angular/router';

import { Chauffeur } from 'Models/Chauffeur';
import { AgenceService } from 'Services/agence.service';
import { map } from 'rxjs/operators';
import { CircuitService } from 'Services/circuit.sevice';
import { StationService } from 'Services/Station.service';
import { Circuit } from 'Models/Circuit';
declare var $: any;
@Component({
  selector: 'app-edit-circuit',
  templateUrl: './edit-circuit.component.html',
  styleUrls: ['./edit-circuit.component.css']
})
export class EditCircuitComponent implements OnInit {

  @Input() chauffeur: Chauffeur;
  chauffeurForm: FormGroup;
  message: string;
  agences: any[] = [];
  station: any[] = [];
  refSapLeoni: string;
  refChemin:string;
  nbKm:number;
  contributionEmploye:number;
  agence:string;
  coutKm:number;
  id:number;
  pointArrivee:string;




  constructor(private chaufservice: CircuitService, private formBuilder: FormBuilder,private stationService: StationService,private route: ActivatedRoute, private agenceService: AgenceService) { }

 
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.refSapLeoni = params['refSapLeoni'];
     
      this.refChemin = params['refChemin'];
      this.nbKm = params['nbKm'];
      this.contributionEmploye = params['contributionEmploye'];
      this.agence = params['agence'];
     
      this.coutKm = params['coutKm'];
      this.pointArrivee = params['nbKm'];
  
      console.log(params);
      console.log(this.refChemin )
    });
  
    this.chauffeurForm = this.formBuilder.group({
      refSapLeoni: [this.refSapLeoni, Validators.required],
      refChemin: [this.refChemin, Validators.required],
      
      nbKm: [this.nbKm, Validators.required],
      contributionEmploye: [this.contributionEmploye, Validators.required],

      coutKm: [this.coutKm, Validators.required],
      pointArrivee: [this.pointArrivee, Validators.required],
    
      agence: [this.agence, Validators.required]
    });

 

  this.agenceService.GetAllAgence().subscribe(agences => {
    this.agences = agences;
  });
  this.stationService.GetAll().subscribe(stations => {
    this.station = stations;
  });
  
  this.chauffeurForm.setValue({
    refSapLeoninom: this.refSapLeoni ,
    refChemin: this.refChemin ,
    nbKm: this.nbKm ,
    contributionEmploye: this.contributionEmploye ,
    coutKm: this.coutKm ,
    pointArrivee: this.pointArrivee ,
    agence: this.agence ,
    
  });


  }
  
  

  updateChauf(): void {
    const token = localStorage.getItem('token');


    
    const updatedChauffeur: Circuit = {

      id:this.id,


      refSapLeoni: this.chauffeurForm.get('refSapLeoni').value,
      refChemin: this.chauffeurForm.get('refChemin').value,
      nbKm: this.chauffeurForm.get('nbKm').value,
      contributionEmploye: this.chauffeurForm.get('contributionEmploye').value,
      coutKm: this.chauffeurForm.get('coutKm').value,
      pointArrivee: this.chauffeurForm.get('pointArrivee').value,
      agence: this.chauffeurForm.get('agence').value,
     
      
      
    };

   
   
    this.chaufservice.updateCircuit(this.id, updatedChauffeur).subscribe(() => {
      console.log(updatedChauffeur.id)
      
      this.message = 'circuit mis à jour';
      
    
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
  }




  showNotification(from: string, align: string, type: string ,message:string) {
  
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


