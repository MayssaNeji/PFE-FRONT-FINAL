import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChauffeurService } from 'Services/chauffeur.service'; 

import { ActivatedRoute } from '@angular/router';

import { Chauffeur } from 'Models/Chauffeur';
import { AgenceService } from 'Services/agence.service';


import { Compte } from 'Models/Compte';
import { UserService } from 'Services/user.service';
declare var $: any;
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  
  @Input() chauffeur: Chauffeur;
  chauffeurForm: FormGroup;
  message: string;
  agences: any[] = [];
  station: any[] = [];
  
  login: string;
  nom: string;
  prenom: string;
  role:string;
  matricule:number;
  tel:number;
  id:number;
  dateDeNaissance: Date;





  constructor(private chaufservice: UserService, private formBuilder: FormBuilder,private stationService: UserService,private route: ActivatedRoute, private agenceService: AgenceService) { }

 
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.matricule = params['matricule'];
      this.login = params['login'];
      this.nom = params['nom'];
      this.prenom = params['prenom'];
      this.tel = params['tel'];
      this.dateDeNaissance = params['dateDeNaissance'];
      this.role = params['role'];
    
      console.log(params);
      
    });
  
    this.chauffeurForm = this.formBuilder.group({
      login: [this.login, Validators.required],
      matricule: [this.matricule, Validators.required],
      nom: [this.nom, Validators.required],
      prenom: [this.prenom, Validators.required],

      tel: [this.tel, Validators.required],
      dateDeNaissance: [this.dateDeNaissance, Validators.required],
      role: [this.role, Validators.required],
     
    });
 
  
  this.chauffeurForm.setValue({
    login: this.login ,
    matricule: this.matricule ,
    nom: this.nom ,
    prenom: this.prenom ,
    tel: this.tel ,
    dateDeNaissance: this.dateDeNaissance ,
    role: this.role ,
  });


  }
  
  

  updateChauf(): void {
    const token = localStorage.getItem('token');


    
    const updatedChauffeur: Compte = {
      role: this.role ,
      id:this.id,
      login: this.chauffeurForm.get('login').value,
      matricule: this.chauffeurForm.get('matricule').value,
      nom: this.chauffeurForm.get('nom').value,
      prenom: this.chauffeurForm.get('prenom').value,
      tel: this.chauffeurForm.get('tel').value,
      dateDeNaissance: this.chauffeurForm.get('dateDeNaissance').value,
    
     
      
    };

   
   
    this.stationService.updateUser(this.id, updatedChauffeur).subscribe(() => {
      console.log(updatedChauffeur.id)
      
      this.message = 'Utilisateur mis à jour';
     
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


