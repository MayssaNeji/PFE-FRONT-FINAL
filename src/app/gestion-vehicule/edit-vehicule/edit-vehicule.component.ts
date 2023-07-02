import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculeService } from 'Services/vehicule.service';
import { ActivatedRoute } from '@angular/router';
import { Vehicule } from 'Models/Vehicule'; 
import { AgenceService } from 'Services/agence.service';
import { map } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-edit-vehicule',
  templateUrl: './edit-vehicule.component.html',
  styleUrls: ['./edit-vehicule.component.css']
})
export class EditVehiculeComponent implements OnInit {

  @Input() chauffeur: Vehicule;
  chauffeurForm: FormGroup;
  message: string;
  agences: any[] = [];
  id: number;
  nomDeReference: string;
  type: string;
  numSerie: number;
  capacite: number;
  agence: string;
  dateDeMiseEnRoute: Date;

  constructor(
    private chaufservice: VehiculeService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private agenceService: AgenceService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.nomDeReference = params['nomDeReference'];
      this.type = params['type'];
      this.numSerie = params['numSerie'];
      this.capacite = params['capacite'];
      this.agence = params['agence'];
      this.dateDeMiseEnRoute = new Date(params['dateDeMiseEnRoute']);

      console.log(params);

      this.chauffeurForm = this.formBuilder.group({
        nomDeReference: [this.nomDeReference, Validators.required],
        type: [this.type, Validators.required],
        dateDeMiseEnRoute: [this.dateDeMiseEnRoute.toISOString().substring(0, 10), Validators.required],
        capacite: [this.capacite, Validators.required],
        numSerie: [this.numSerie, Validators.required],
        id: [''],
        agence: [this.agence, Validators.required]
      });

      this.agenceService.GetAllAgence().subscribe(agences => {
        this.agences = agences;
      });

      this.chauffeurForm.patchValue({
        nomDeReference: this.nomDeReference,
        type: this.type,
        dateDeMiseEnRoute: this.dateDeMiseEnRoute.toISOString().substring(0, 10),
        capacite: this.capacite,
        numSerie: this.numSerie,
        agence: this.agence
      });
    });
  }

  updateChauf(): void {
    const token = localStorage.getItem('token');

    const updatedChauffeur: Vehicule = {
      id: this.id,
      nomDeReference: this.chauffeurForm.get('nomDeReference').value,
      type: this.chauffeurForm.get('type').value,
      dateDeMiseEnRoute: this.chauffeurForm.get('dateDeMiseEnRoute').value,
      capacite: this.chauffeurForm.get('capacite').value,
      numSerie: this.chauffeurForm.get('numSerie').value,
      agence: this.chauffeurForm.get('agence').value,
    };

    console.log(updatedChauffeur.nomDeReference);

    this.chaufservice.updatevehicule(this.id, updatedChauffeur).subscribe(
      () => {
        console.log(updatedChauffeur.id);
      
        this.message = 'Shift mis à jour';
        
     
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
