import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChauffeurService } from 'Services/chauffeur.service';
import { ActivatedRoute } from '@angular/router';
import { Chauffeur } from 'Models/Chauffeur';
import { AgenceService } from 'Services/agence.service';
import { map } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-edit-chauffeur',
  templateUrl: './edit-chauffeur.component.html',
  styleUrls: ['./edit-chauffeur.component.css']
})
export class EditChauffeurComponent implements OnInit {

  @Input() chauffeur: Chauffeur;
  chauffeurForm: FormGroup;
  message: string;
  agences: any[] = [];
  id: number;
  nom: string;
  prenom: string;
  telephone: number;
  agence: string;
  dateDeNaissance: Date;

  constructor(
    private chaufservice: ChauffeurService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private agenceService: AgenceService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.nom = params['nom'];
      this.prenom = params['prenom'];
      this.telephone = params['telephone'];
      this.agence = params['agence'];
      this.dateDeNaissance = new Date(params['dateDeNaissance']);

      console.log(params);

      this.chauffeurForm = this.formBuilder.group({
        nom: [this.nom, Validators.required],
        prenom: [this.prenom, Validators.required],
        dateDeNaissance: [this.dateDeNaissance.toISOString().substring(0, 10), Validators.required],
        telephone: [this.telephone, Validators.required],
        id: [''],
        agence: [this.agence, Validators.required]
      });

      this.agenceService.GetAllAgence().subscribe(agences => {
        this.agences = agences;
      });

      this.chauffeurForm.patchValue({
        nom: this.nom,
        prenom: this.prenom,
        dateDeNaissance: this.dateDeNaissance.toISOString().substring(0, 10),
        telephone: this.telephone,
        agence: this.agence
      });
    });
  }

  updateChauf(): void {
    const token = localStorage.getItem('token');

    const updatedChauffeur: Chauffeur = {
      id: this.id,
      nom: this.chauffeurForm.get('nom').value,
      prenom: this.chauffeurForm.get('prenom').value,
      dateDeNaissance: this.chauffeurForm.get('dateDeNaissance').value,
      telephone: this.chauffeurForm.get('telephone').value,
      agence: this.chauffeurForm.get('agence').value,
    };

    console.log(updatedChauffeur.nom);

    this.chaufservice.updateChauf(this.id, updatedChauffeur).subscribe(
      () => {
        console.log(updatedChauffeur.id);
        console.log(updatedChauffeur.nom);
        this.message = 'Chauffeur mis à jour';
        this.showNotification('top', 'center', 'success');
      },
      () => {
        this.message = 'Verifiez les types des entrées';
        this.showNotification('top', 'center', 'danger');
      }
    );
  }

  showNotification(from: string, align: string, type: string) {
    let message: string;

    if (type === 'success') {
      message = 'Chauffeur mis à jour';
    } else if (type === 'danger') {
      message = 'Verifiez les types des entrées';
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
