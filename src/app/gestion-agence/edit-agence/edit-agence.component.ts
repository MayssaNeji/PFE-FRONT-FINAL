import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculeService } from 'Services/vehicule.service';
import { ActivatedRoute } from '@angular/router';
import { Vehicule } from 'Models/Vehicule'; 
import { AgenceService } from 'Services/agence.service';
import { map } from 'rxjs/operators';
import { Shift } from 'Models/Shift';
import { ShiftService } from 'Services/Shift.service';
import { Agence } from 'Models/Agence';
declare var $: any;

@Component({
  selector: 'app-edit-agence',
  templateUrl: './edit-agence.component.html',
  styleUrls: ['./edit-agence.component.css']
})
export class EditAgenceComponent implements OnInit {

  @Input() chauffeur: Vehicule;
  chauffeurForm: FormGroup;
  message: string;
  agences: any[] = [];
  nom: string;
  Id: number;
  adresse: string;
  telephone: string;
  matriculeFiscale: string;
  siteInternet: string;
  email: string;
 

  constructor(
    private chaufservice: AgenceService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private agenceService: AgenceService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.nom = params['nom'];
      this.Id = params['Id'];
      this.adresse = params['adresse'];
      this.telephone = params['telephone'];
      this.matriculeFiscale = params['matriculeFiscale'];
      this.siteInternet = params['siteInternet'];
      this.email = params['email'];
   
      console.log(params);

      this.chauffeurForm = this.formBuilder.group({
        nom: [this.nom, Validators.required],
        Id: [this.Id, Validators.required],
        telephone: [this.telephone, Validators.required],
        adresse: [this.adresse, Validators.required],
        matriculeFiscale: [this.matriculeFiscale, Validators.required],
        siteInternet: [this.siteInternet, Validators.required],
        email: [this.email, Validators.required],
    
      });

      this.agenceService.GetAllAgence().subscribe(agences => {
        this.agences = agences;
      });

      this.chauffeurForm.patchValue({
        nom: this.nom,
      
        adresse: this.adresse,
        telephone: this.telephone,
        matriculeFiscale: this.matriculeFiscale,
        siteInternet: this.siteInternet,
        email: this.email,
     
      });
    });
  }

  updateChauf(): void {
    const token = localStorage.getItem('token');

    const updatedChauffeur: Agence = {
      nom: this.chauffeurForm.get('nom').value,
      id: this.Id,
      adresse: this.chauffeurForm.get('adresse').value,
      telephone: this.chauffeurForm.get('telephone').value,
      matriculeFiscale: this.chauffeurForm.get('matriculeFiscale').value,
      siteInternet: this.chauffeurForm.get('siteInternet').value,
      email: this.chauffeurForm.get('email').value,
      
    };

    console.log(updatedChauffeur.id);

    this.chaufservice.updateAgence(this.Id, updatedChauffeur).subscribe(
      () => {
        console.log(updatedChauffeur.nom);
      
        this.message = 'Agence mise à jour';
        
     
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

