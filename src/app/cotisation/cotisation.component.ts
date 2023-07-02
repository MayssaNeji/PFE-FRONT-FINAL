import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cotisation } from 'Models/Cotisation';
import { CotisationService } from 'Services/Cotisation.service';
import * as XLSX from 'xlsx';
declare var $: any;
@Component({
  selector: 'app-cotisation',
  templateUrl: './cotisation.component.html',
  styleUrls: ['./cotisation.component.css']
})
export class CotisationComponent {
  years: number[] = [];
  data: any[] = [];
  message: string = '';

  Cotisation: FormGroup = new FormGroup({
    ps: new FormControl('', Validators.required),
    mois: new FormControl('', Validators.required),
    annee: new FormControl('', Validators.required),
  });

  constructor(private cot: CotisationService) {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
      this.years.push(year);
    }
  }

  CreatePlan() {
    // check if form is valid
    if (this.Cotisation.invalid) {
      console.log(this.Cotisation.controls['mois'].value);
    
      console.log(this.Cotisation.controls['ps'].value);
      console.log(this.Cotisation.controls['annee'].value);
      return;
    }

    this.Cotisation.valueChanges.subscribe(val => {
      console.log(val);
    });

    const newCotisation: Cotisation = {
      ps: this.Cotisation.controls['ps'].value,
      annee: this.Cotisation.controls['annee'].value,
      mois: this.Cotisation.controls['mois'].value,
    };

    // call CreateCotisation method of cot service
    this.cot.CreateCotisation(newCotisation.annee, newCotisation.mois, newCotisation.ps).subscribe(data => {
      this.data = data;
      this.message = 'Cotisation télécharée avec succès';
      this.showNotification('top', 'center', 'success', this.message);

      // Export the result as an Excel file
       const worksheet = XLSX.utils.json_to_sheet(this.data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Cotisation');
    XLSX.writeFile(workbook, 'Cotisation.xlsx');
    }, error => {
      if (error.error && error.error instanceof ErrorEvent) {
        // Client-side error
        this.message = error.error.message;
      } else if (error.error && typeof error.error === 'string') {
        // Backend returned an error message as a string
        this.message = error.error;
      } else {
        // Other types of errors
        this.message = 'Erreur de création';
      }

      this.showNotification('top', 'center', 'danger', this.message);
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
