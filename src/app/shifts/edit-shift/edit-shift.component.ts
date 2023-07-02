import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculeService } from 'Services/vehicule.service';
import { ActivatedRoute } from '@angular/router';
import { Vehicule } from 'Models/Vehicule'; 
import { AgenceService } from 'Services/agence.service';
import { map } from 'rxjs/operators';
import { Shift } from 'Models/Shift';
import { ShiftService } from 'Services/Shift.service';
declare var $: any;

@Component({
  selector: 'app-edit-shift',
  templateUrl: './edit-shift.component.html',
  styleUrls: ['./edit-shift.component.css']
})
export class EditShiftComponent implements OnInit {

  @Input() chauffeur: Vehicule;
  chauffeurForm: FormGroup;
  message: string;
  agences: any[] = [];
  referenceShift: string;
    lundi: string;
    mardi: string;
    mercredi: string;
    jeudi: string;
    vendredi: string;
    samedi: string;
    dimanche: string;

  constructor(
    private chaufservice: ShiftService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private agenceService: AgenceService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.referenceShift = params['referenceShift'];
      this.lundi = params['lundi'];
      this.mardi = params['mardi'];
      this.mercredi = params['mercredi'];
      this.jeudi = params['jeudi'];
      this.vendredi = params['vendredi'];
      this.samedi = params['samedi'];
      this.dimanche = params['dimanche'];
      console.log(params);

      this.chauffeurForm = this.formBuilder.group({
        referenceShift: [this.referenceShift, Validators.required],
        lundi: [this.lundi, Validators.required],
        mardi: [this.mardi, Validators.required],
        mercredi: [this.mercredi, Validators.required],
        jeudi: [this.jeudi, Validators.required],
        vendredi: [this.vendredi, Validators.required],
        samedi: [this.samedi, Validators.required],
        dimanche: [this.dimanche, Validators.required],
      });

      this.agenceService.GetAllAgence().subscribe(agences => {
        this.agences = agences;
      });

      this.chauffeurForm.patchValue({
        referenceShift: this.referenceShift,
        lundi: this.lundi,
        mardi: this.mardi,
        mercredi: this.mercredi,
        jeudi: this.jeudi,
        vendredi: this.vendredi,
        samedi: this.samedi,
        dimanche: this.dimanche,
      });
    });
  }

  updateChauf(): void {
    const token = localStorage.getItem('token');

    const updatedChauffeur: Shift = {
      referenceShift: this.referenceShift,
      lundi: this.chauffeurForm.get('lundi').value,
      mardi: this.chauffeurForm.get('mardi').value,
      mercredi: this.chauffeurForm.get('mercredi').value,
      jeudi: this.chauffeurForm.get('jeudi').value,
      vendredi: this.chauffeurForm.get('vendredi').value,
      samedi: this.chauffeurForm.get('samedi').value,
      dimanche: this.chauffeurForm.get('dimanche').value,
    };

    console.log(updatedChauffeur.referenceShift);

    this.chaufservice.updateShift(this.referenceShift, updatedChauffeur).subscribe(
      () => {
        console.log(updatedChauffeur.referenceShift);
      
        this.message = 'Vehicule mis à jour';
        
     
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
      }
    );
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
