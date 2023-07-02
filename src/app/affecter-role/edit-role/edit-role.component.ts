import { Component, Input, OnInit } from '@angular/core';
import { AgenceService } from 'Services/agence.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Compte } from 'Models/Compte';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'Services/user.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent implements OnInit {
  @Input() 
  message: string = '';
  ok: boolean = true;
  user: Compte;
  agences: any[] = [];
  userForm: FormGroup;
  UserId: number;
  login:string;
  Nom:string;
  Prenom:string;
  DateDeNaissance:Date;
  Tel: number;
  Matricule: number;
  

  constructor(
    private userService: UserService,
    private agenceService: AgenceService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { 
    this.agenceService.GetAllAgence().subscribe(data => {
      this.agences = data;
    });
    this.userForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateDeNaissance: ['', Validators.required],
      tel: ['', Validators.required],
      matricule: [''],
      login: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.UserId = params['id'];
      this.login=params['login'];
      this.Nom=params['nom'];
      this.Prenom=params['prenom'];
      this.DateDeNaissance=params['dateDeNaissance'];
      this.Tel=params['tel'];
      this.Matricule=params['matricule'];
     
      
    });
    this.userService.SearchUser(this.UserId).pipe(
      map((user: any) => {
        return {
          id: user.id,
          matricule:user.matricule,
          nom: user.nom,
          login: user.login,
          prenom: user.prenom,
          dateDeNaissance: new Date(user.dateDeNaissance),
          tel: user.tel,
          role: user.role,
         
        };
       
      } )
    ).subscribe((user) => {
      this.user = user;
      console.log(user);
      
      this.userForm.patchValue({
        nom: user.nom,
        prenom: user.prenom,
        dateDeNaissance: user.dateDeNaissance.toISOString().substring(0, 10),
        tel: user.tel,
        matricule: user.matricule,
        login: user.login,
        role: user.role,
        id: user.id,
       

      });
     



    });
  }
  updateUser() {
    const token = localStorage.getItem('token');

    const User: Compte = {
      login:this.user.login,
      role: this.userForm.controls['role'].value,
      nom:this.Nom,
      prenom:this.Prenom,
      matricule:this.Matricule,
      dateDeNaissance:this.DateDeNaissance,
      id:this.UserId,
      tel:this.Tel,

    };

    this.userService.updateUser(User.id, User).subscribe(() => {
      console.log(User.id);
      this.message = 'Role mis à jour';
      this.showNotification('top', 'center', 'success',this.message);
    }, () => {
      this.message = 'erreur ';
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
