
import { Component } from '@angular/core';
import { AuthService } from 'Services/auth.service';
declare var $: any;
@Component({
  selector: 'app-forgotpwrd',
  templateUrl: './forgotpwrd.component.html',
  styleUrls: ['./forgotpwrd.component.css']
})
export class ForgotpwrdComponent  {

 









  email: string = '';
  constructor(private authService: AuthService ) {}
  
  forgotpswd(email: string) {
    this.authService.forgotpswd(email).subscribe(
      (response: any) => {
          console.log(response.message);
           
              this.showNotification('top', 'center', 'success');
        
        
      },
      (error: any) => {
  
         
           this.showNotification('top', 'center', 'danger');
        
      }
    );
  }




  showNotification(from: string, align: string, type: string) {
    let message: string;
  
    if (type === 'success') {
      message = 'Le nouveau mot de passe est envoyé';
    } else if (type === 'danger') {
      message = 'verifier votre adress email';
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
