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
import { ShiftService } from 'Services/Shift.service';
import { SegService } from 'Services/seg.sevice';
import { Employe } from 'Models/Employe';
import { EmployeService } from 'Services/Employe.service';
declare var $: any;
@Component({
  selector: 'app-edit-employe',
  templateUrl: './edit-employe.component.html',
  styleUrls: ['./edit-employe.component.css']
})
export class EditEmployeComponent implements OnInit {

  @Input() chauffeur: Chauffeur;
  chauffeurForm: FormGroup;
  message: string;
 
 

  stations: any[] = [];
  segments: any[] = [];
  shifts: any[] = [];


  nom: string;
  prenom:string;
  matricule:number;
  telephone:number;
  contreMaitre:string;

  nomDuGroupe:string;
  ps:string;
  centreDeCout:string;
 




  constructor(private chaufservice: EmployeService,
     private formBuilder: FormBuilder,
     private stationService: StationService,
     private route: ActivatedRoute, private agenceService: AgenceService,
     private shift: ShiftService,
     private segment: SegService,
     private station:StationService) { 
    this.station.GetAll().subscribe(DATA => {
      this.stations = DATA;
    });
    console.log(this.stations);




    
    this.shift.GetAll().subscribe(DATA => {
      this.shifts = DATA;
    });



    
    this.segment.GetAll().subscribe(DATA => {
      this.segments = DATA;
    });
  }
  

 
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.matricule = params['matricule'];
      this.nom = params['nom'];
     
      this.prenom = params['prenom'];
      this.contreMaitre = params['contreMaitre'];
      this.nomDuGroupe = params['nomDuGroupe'];
      this.ps = params['ps'];
     
      this.telephone = params['telephone'];
      this.centreDeCout = params['centreDeCout'];


      this.station = params['station'];
     
      this.segment = params['segment'];
      this.shift = params['shift'];
  
  
      console.log(params);
     
    });
  
    this.chauffeurForm = this.formBuilder.group({
      matricule: [this.matricule, Validators.required],
      nom: [this.nom, Validators.required],
      
      prenom: [this.prenom, Validators.required],
      contreMaitre: [this.contreMaitre, Validators.required],

      nomDuGroupe: [this.nomDuGroupe, Validators.required],
      ps: [this.ps, Validators.required],
    
      telephone: [this.telephone, Validators.required],


      centreDeCout: [this.centreDeCout, Validators.required],
      station: [this.station, Validators.required],

      segment: [this.segment, Validators.required],
      shift: [this.shift, Validators.required],
    
      


    });

 

  this.chauffeurForm.setValue({
 
    nomDuGroupe: this.nomDuGroupe ,
    nom: this.nom ,
    prenom: this.prenom ,
    contreMaitre: this.contreMaitre ,
    ps: this.ps ,
    telephone: this.telephone ,
    centreDeCout: this.centreDeCout ,
    station: this.station ,
    segment: this.segment ,
    shift: this.shift ,
    
    
  });


  }
  
  

  updateChauf(): void {
    const token = localStorage.getItem('token');


    
    const updatedChauffeur: Employe = {

      matricule:this.matricule,


      nom: this.chauffeurForm.get('nom').value,
      prenom: this.chauffeurForm.get('prenom').value,
      contreMaitre: this.chauffeurForm.get('contreMaitre').value,
      nomDuGroupe: this.chauffeurForm.get('nomDuGroupe').value,
      ps: this.chauffeurForm.get('ps').value,
      telephone: this.chauffeurForm.get('telephone').value,
      centreDeCout: this.chauffeurForm.get('centreDeCout').value,
      station: this.chauffeurForm.get('station').value,
      segment: this.chauffeurForm.get('segment').value,
      shift: this.chauffeurForm.get('shift').value,
     
      
      
    };
    console.log(updatedChauffeur)
   
   
    this.chaufservice.updateEmploye(this.matricule, updatedChauffeur).subscribe(() => {
      console.log(updatedChauffeur.matricule)
      
      this.message = 'employé mis à jour';
     
     
        this.showNotification('top', 'center', 'success', this.message);
      }, error => {
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




  showNotification(from: string, align: string, type: string,message: string) {
   
  
   
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


