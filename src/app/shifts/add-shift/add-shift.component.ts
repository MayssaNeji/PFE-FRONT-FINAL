import { Component } from '@angular/core';
import { ChauffeurService } from 'Services/chauffeur.service';
import { AgenceService } from 'Services/agence.service';
import { Chauffeur } from 'Models/Chauffeur';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ShiftService } from 'Services/Shift.service';
import { Shift } from 'Models/Shift';
declare var $: any;
@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.css']
})
export class AddShiftComponent  {

  message: string='';
  ok: boolean=true;

  agences: any[] = [];

  chauffeurForm: FormGroup = new FormGroup({
    referenceShift: new FormControl('', Validators.required),
    lundi: new FormControl('', Validators.required),
    mardi: new FormControl('', Validators.required),
    mercredi: new FormControl('', Validators.required),
    jeudi: new FormControl('', Validators.required),
    vendredi: new FormControl('', Validators.required),
    samedi: new FormControl('', Validators.required),
    dimanche: new FormControl('', Validators.required),
   

  
  });

  constructor(
    private chauffeur:ShiftService,
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
      console.log(this.chauffeurForm.controls['referenceShift'].errors);
      console.log(this.chauffeurForm.controls['lundi'].errors);
      console.log(this.chauffeurForm.controls['mardi'].errors);
      console.log(this.chauffeurForm.controls['mercredi'].errors);
      console.log(this.chauffeurForm.controls['jeudi'].errors);
      console.log(this.chauffeurForm.controls['vendredi'].errors);
      console.log(this.chauffeurForm.controls['samedi'].errors);
      console.log(this.chauffeurForm.controls['dimanche'].errors);
      // add console.log statements for each control that you want to check
      return;
    }
    this.chauffeurForm.valueChanges.subscribe(val => {
      console.log(val);
    });
    
  
   
      const newChauffeur: Shift = {
        referenceShift: this.chauffeurForm.controls['referenceShift'].value,
        lundi: this.chauffeurForm.controls['lundi'].value,
        mardi: this.chauffeurForm.controls['mardi'].value,
        mercredi: this.chauffeurForm.controls['mercredi'].value,
        jeudi: this.chauffeurForm.controls['jeudi'].value,
        vendredi: this.chauffeurForm.controls['vendredi'].value,
        samedi: this.chauffeurForm.controls['samedi'].value,
        dimanche: this.chauffeurForm.controls['dimanche'].value,
        
       
      };
  



      







      // call createchauf method of chauffeur service
      this.chauffeur.CreateShift(newChauffeur).subscribe(() => {
        this.message = 'Shift ajouté avec succès';
     
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
    ;
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
