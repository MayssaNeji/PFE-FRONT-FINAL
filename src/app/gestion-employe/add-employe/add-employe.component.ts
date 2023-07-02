import { Component, OnInit } from '@angular/core';
import { CircuitService } from 'Services/circuit.sevice';
import { AgenceService } from 'Services/agence.service';
import { Circuit } from 'Models/Circuit';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { StationService } from 'Services/Station.service';
import { ShiftService } from 'Services/Shift.service';
import { SegService } from 'Services/seg.sevice';
import { EmployeService } from 'Services/Employe.service';
import { Employe } from 'Models/Employe';

declare var $: any;

@Component({
  selector: 'app-add-employe',
  templateUrl: './add-employe.component.html',
  styleUrls: ['./add-employe.component.css']
})
export class AddEmployeComponent  {

  message: string='';
  ok: boolean=true;

  agences: any[] = [];
  stations: any[] = [];
  segments: any[] = [];
  shifts: any[] = [];
  

  chauffeurForm: FormGroup = new FormGroup({
    matricule: new FormControl('', Validators.required),
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    contreMaitre: new FormControl('', Validators.required),
    nomDuGroupe: new FormControl('', Validators.required),
    ps: new FormControl('', Validators.required),
    telephone : new FormControl('', Validators.required),
    centreDeCout: new FormControl('', Validators.required),
    station: new FormControl('', Validators.required),
    segment: new FormControl('', Validators.required),
    shift: new FormControl('', Validators.required),
    
  });

  constructor(
    private chauffeur:EmployeService,
    private agenceService: AgenceService,
    private shift: ShiftService,
    private segment: SegService,
    private station:StationService
    
  ) { 
    this.agenceService.GetAllAgence().subscribe(data => {
      this.agences = data;
    });




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







  
  Createchauf() {
    // check if form is valid
    if (this.chauffeurForm.invalid) {
      console.log('Form is invalid');
     // console.log(this.chauffeurForm.controls['pointArrivee'].errors);
      //console.log(this.chauffeurForm.controls['nbKm'].errors);
     // console.log(this.chauffeurForm.controls['contributionEmploye'].errors);
      //console.log(this.chauffeurForm.controls['agence'].errors);
      // add console.log statements for each control that you want to check
      return;
    }
    this.chauffeurForm.valueChanges.subscribe(val => {
      console.log(val);
    });
   
      const newChauffeur: Employe = {
        matricule: this.chauffeurForm.controls['matricule'].value,
        nom: this.chauffeurForm.controls['nom'].value,
        prenom: this.chauffeurForm.controls['prenom'].value,
        contreMaitre : this.chauffeurForm.controls['contreMaitre'].value,
        nomDuGroupe: this.chauffeurForm.controls['nomDuGroupe'].value,
        ps:  this.chauffeurForm.controls['ps'].value,
        telephone:  this.chauffeurForm.controls['telephone'].value,

        centreDeCout: this.chauffeurForm.controls['centreDeCout'].value,
        station: this.chauffeurForm.controls['station'].value,
        segment: this.chauffeurForm.controls['segment'].value,
        shift : this.chauffeurForm.controls['shift'].value,
        
      };
  



      







      // call createchauf method of chauffeur service
      this.chauffeur.CreateEmploye(newChauffeur).subscribe(() => {
        this.message = 'Employé ajouté avec succès';
     
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
