import { Component } from '@angular/core';
import { VehiculeService } from 'Services/vehicule.service';
import { AgenceService } from 'Services/agence.service';
import { Vehicule } from 'Models/Vehicule';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-add-vehicule',
  templateUrl: './add-vehicule.component.html',
  styleUrls: ['./add-vehicule.component.css']
})
export class AddVehiculeComponent  {

 
  message: string='';
  ok: boolean=true;

  agences: any[] = [];

  chauffeurForm: FormGroup = new FormGroup({
    nomDeReference: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    dateDeMiseEnRoute: new FormControl('', Validators.required),
    capacite: new FormControl('', Validators.required),
    numSerie: new FormControl('', Validators.required),
    agence: new FormControl('', Validators.required),
   
  
  });

  constructor(
    private VehiculeService:VehiculeService,
    private agenceService: AgenceService,
    
  ) { 
    this.agenceService.GetAllAgence().subscribe(data => {
      this.agences = data;
    });
  }







  
  Createchauf() {
    // check if form is valid
    if (this.chauffeurForm.invalid) {
      console.log('Form is invalid');
      console.log(this.chauffeurForm.controls['nomDeReference'].errors);
      console.log(this.chauffeurForm.controls['type'].errors);
      console.log(this.chauffeurForm.controls['agence'].errors);
      console.log(this.chauffeurForm.controls['dateDeMiseEnRoute'].errors);
      console.log(this.chauffeurForm.controls['capacite'].errors);
      console.log(this.chauffeurForm.controls['numSerie'].errors);
   
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
      const newChauffeur: Vehicule = {
        nomDeReference: this.chauffeurForm.controls['nomDeReference'].value,
        type: this.chauffeurForm.controls['type'].value,
        dateDeMiseEnRoute: this.chauffeurForm.controls['dateDeMiseEnRoute'].value,
        capacite: this.chauffeurForm.controls['capacite'].value,
        numSerie: this.chauffeurForm.controls['numSerie'].value,
        agence:  this.chauffeurForm.controls['agence'].value,
       
      };
  



      







      // call createchauf method of chauffeur service
      this.VehiculeService.Createvehicule(newChauffeur).subscribe(() => {
        this.message = 'vehicule ajouté avec succès';
        
     
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
