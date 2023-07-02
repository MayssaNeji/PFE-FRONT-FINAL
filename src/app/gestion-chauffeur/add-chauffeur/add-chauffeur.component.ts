import { Component } from '@angular/core';
import { ChauffeurService } from 'Services/chauffeur.service';
import { AgenceService } from 'Services/agence.service';
import { Chauffeur } from 'Models/Chauffeur';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
declare var $: any;
@Component({
  selector: 'app-add-chauffeur',
  templateUrl: './add-chauffeur.component.html',
  styleUrls: ['./add-chauffeur.component.css']
})
export class AddChauffeurComponent{

  message: string='';
  ok: boolean=true;

  agences: any[] = [];

  chauffeurForm: FormGroup = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    dateDeNaissance: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    agence: new FormControl('', Validators.required),
   
  
  });

  constructor(
    private chauffeur:ChauffeurService,
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
      return;
    }
    this.chauffeurForm.valueChanges.subscribe(val => {
      console.log(val);
    });
    
      const newChauffeur: Chauffeur = {
        nom: this.chauffeurForm.controls['nom'].value,
        prenom: this.chauffeurForm.controls['prenom'].value,
        dateDeNaissance: this.chauffeurForm.controls['dateDeNaissance'].value,
        telephone: this.chauffeurForm.controls['telephone'].value,
        agence: this.chauffeurForm.controls['agence'].value,
        
      };
      // call createchauf method of chauffeur service
      this.chauffeur.Createchauf(newChauffeur).subscribe(() => {
        this.message = 'Chauffeur ajouté avec succès';
     
        this.showNotification('top', 'center', 'success', this.message);
      }, error => {
        if (error.error && error.error instanceof ErrorEvent) {
          // Client-side error
          this.message = error.error.message;
        } else if (error.error && typeof error.error === 'string') {
          // Backend returned an error message as a string
          if (error.error === 'Chauffeur existe déjà') {
            this.message = 'Un chauffeur avec les mêmes détails existe déjà.';
          } else {
            this.message = error.error.message;
          }
        } else {
          // Other types of errors
          this.message = 'Verifiez les types des entrées';
        }
        this.showNotification('top', 'center', 'danger', this.message);
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
