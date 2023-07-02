import { Component } from '@angular/core';
import { ChauffeurService } from 'Services/chauffeur.service';
import { AgenceService } from 'Services/agence.service';
import { Chauffeur } from 'Models/Chauffeur';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AuditService } from 'Services/Audit.service';
import { Agence } from 'Models/Agence';
declare var $: any;
@Component({
  selector: 'app-add-agence',
  templateUrl: './add-agence.component.html',
  styleUrls: ['./add-agence.component.css']
})
export class AddAgenceComponent {

  message: string='';
  ok: boolean=true;

  chauffeurForm: FormGroup = new FormGroup({
    nom: new FormControl('', Validators.required),
    adresse: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    matriculeFiscale: new FormControl('', Validators.required),
    siteInternet: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  
  });

  constructor(
    private chauffeur:AgenceService,
    
    
  ) { 
    
  }

  
  Createchauf() {
    // check if form is valid
    if (this.chauffeurForm.invalid) {
      console.log('Form is invalid');
      console.log(this.chauffeurForm.controls['nom'].errors);
      console.log(this.chauffeurForm.controls['adresse'].errors);
      console.log(this.chauffeurForm.controls['matriculeFiscale'].errors);
      console.log(this.chauffeurForm.controls['siteInternet'].errors);
      console.log(this.chauffeurForm.controls['email'].errors);
   
      return;
    }
    this.chauffeurForm.valueChanges.subscribe(val => {
      console.log(val);
    });
    

      const newChauffeur: Agence = {
        nom: this.chauffeurForm.controls['nom'].value,
        adresse: this.chauffeurForm.controls['adresse'].value,
        telephone: this.chauffeurForm.controls['telephone'].value,
        matriculeFiscale: this.chauffeurForm.controls['matriculeFiscale'].value,
        siteInternet:  this.chauffeurForm.controls['siteInternet'].value,
        email:  this.chauffeurForm.controls['email'].value,
      };
  



      console.log(this.chauffeurForm.controls['nom'].errors);
      console.log(this.chauffeurForm.controls['adresse'].errors);
      console.log(this.chauffeurForm.controls['matriculeFiscale'].errors);
      console.log(this.chauffeurForm.controls['siteInternet'].errors);
      console.log(this.chauffeurForm.controls['email'].errors);


      // call createchauf method of chauffeur service
      this.chauffeur.CreateAgence(newChauffeur).subscribe(() => {
        this.message = 'Agence ajouté avec succès';
        this.ok = true;
        this.showNotification('top', 'center', 'success');
      },error  => {
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
    
        this.ok = false;
        this.showNotification('top', 'center', 'danger');
      });
    
    ;
  }
  
  showNotification(from: string, align: string, type: string) {
    let message: string;
  
    if (type === 'success') {
      message = 'Agence ajouté avec succès';
    } else if (type === 'danger') {
      message = 'Verifiez les informations';
    }
  
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
