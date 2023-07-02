import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Compte } from 'Models/Compte';
import { UserService } from 'Services/user.service';

declare var $: any;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  message: string = '';

  segmentForm: FormGroup = new FormGroup({
    matricule: new FormControl('', Validators.required),
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    tel: new FormControl('', Validators.required),
    dateDeNaissance: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required)
  });

  constructor(private userService: UserService) { }

  CreateUser(station: Compte, password: string) {
    station.login = this.segmentForm.controls['matricule'].value;
    station.matricule = this.segmentForm.controls['matricule'].value;
    station.nom = this.segmentForm.controls['nom'].value;
    station.prenom = this.segmentForm.controls['prenom'].value;
    station.tel = this.segmentForm.controls['tel'].value;
    station.dateDeNaissance = this.segmentForm.controls['dateDeNaissance'].value;
    station.role = this.segmentForm.controls['role'].value;
  
    this.userService.register(station, password).subscribe(() => {
      this.message = 'Utilisateur ajouté avec succès';
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
        this.message = 'Vérifiez les types des entrées';
      }
      this.showNotification('top', 'center', 'danger', this.message);
    });
  }
  
  showNotification(from: string, align: string, type: string, message: string) {
    $.notify(
      {
        icon: 'notifications',
        message: message
      },
      {
        type: type,
        timer: 3000,
        placement: {
          from: from,
          align: align
        },
        template:
          '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
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
