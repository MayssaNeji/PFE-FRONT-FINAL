import { Component } from '@angular/core';
import { StationService } from 'Services/Station.service';
import { AgenceService } from 'Services/agence.service';
import { Station } from 'Models/Station';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-add-station',
  templateUrl: './add-station.component.html',
  styleUrls: ['./add-station.component.css']
})
export class AddStationComponent  {

  message: string='';
  ok: boolean=true;

  segmentForm: FormGroup = new FormGroup({
    referenceRegion: new FormControl('', Validators.required),
    refSapLeoni: new FormControl('', Validators.required),
    longitude: new FormControl('', Validators.required),
    latitude: new FormControl('', Validators.required),
    rayon: new FormControl('', Validators.required)
  });
  constructor(private StationService: StationService) { }


  CreateSeg(station:Station) {
    const Station = ({
      referenceRegion: this.segmentForm.controls['referenceRegion'].value,
      refSapLeoni: this.segmentForm.controls['refSapLeoni'].value,
      longitude: this.segmentForm.controls['longitude'].value,
      latitude: this.segmentForm.controls['latitude'].value,
      rayon: this.segmentForm.controls['rayon'].value
      
    });
    console.log(Station);
 
  
    this.StationService.CreateStation(station).subscribe(() => {
      this.message = 'Station ajouté avec succès';
     
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

    
    })
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
