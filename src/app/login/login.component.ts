import { Component } from '@angular/core';
import { Compte } from 'Models/Compte';
import { AuthService } from 'Services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  password:string = '';
  user = new Compte();

  constructor(private authService: AuthService , private router: Router) {}

  register(user: Compte) {
    this.authService.register(user).subscribe();
  }

 




    login(user: Compte ,password :string) {
      
      this.authService.login(user,password).subscribe(
        (response: { role: string, message: string, token: string }) => {
          console.log(response.role);
          console.log(response);
          localStorage.setItem('role', response.role);
          if (response.message === "Login successful") { 


            this.handleLoginSuccess(response.token);
          } else {
            
            this.showNotification('top', 'center', 'danger',response.message);
          }
        },
        (error: any) => {
          if (error.status === 400) {
          
            this.showNotification('top', 'center', 'danger',error.error);
          } else {
            alert('An error occurred');
          }
        }
      );
    }
    
    private handleLoginSuccess(token: string) {
      localStorage.setItem('authToken', token);
      let role=localStorage.getItem('role')
      if (role === 'Admin') {
        this.router.navigate(['/dashboard']);
      } else if (role === 'Super Admin') {
        this.router.navigate(['/AffecterRole']);
      } else if (role === 'Agent de paie') {
        this.router.navigate(['/cotisation']);
      } else if (role === 'Chef de Segment') {
        this.router.navigate(['/planSegment']);
      } else if (role === 'Agent de finance') {
        this.router.navigate(['/facture']);
      } else if (role === 'Agent juridique') {
        this.router.navigate(['/etatAudit']);
      } else if (role === 'Agent SOS/SHE/PPE') {
        this.router.navigate(['/audit']);
      } else if (role === 'Responsable de Transport') {
        this.router.navigate(['/gestion-agence']);
      } else if (role === 'PS Manager') {
        this.router.navigate(['/user-profile']);
      } else if (role === 'Responsable segment') {
        this.router.navigate(['/planSegment']);
      } else if (role === 'DG/RH') {
        this.router.navigate(['/dashboard']);
      } else if (role === 'RH Segment') {
        this.router.navigate(['/gestion-segment']);
      } else if (role === 'RH PS') {
        this.router.navigate(['/rh-ps-component']);
      }
      else if (role === 'Key user Transport') {
        this.router.navigate(['/ImportEmploye']);
      }
    
      else {
        // Handle unrecognized or unsupported roles
        this.router.navigate(['/unauthorized']);
      }

    }


    showNotification(from: string, align: string, type: string, message: string) {
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
    

    onForgotPassword() {
      this.router.navigate(['/forgotpswrd']);
    }
    


  }
  
  
  
  



