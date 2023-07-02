import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChauffeurService } from 'Services/chauffeur.service'; 

import { ActivatedRoute } from '@angular/router';

import { Chauffeur } from 'Models/Chauffeur';
import { AgenceService } from 'Services/agence.service';
import { map } from 'rxjs/operators';
import { CircuitService } from 'Services/circuit.sevice';
import { StationService } from 'Services/Station.service';
import { Station } from 'Models/Station'; 
declare var $: any;
@Component({
  selector: 'app-edit-station',
  templateUrl: './edit-station.component.html',
  styleUrls: ['./edit-station.component.css']
})
export class EditStationComponent implements OnInit {

  
  @Input() chauffeur: Chauffeur;
  chauffeurForm: FormGroup;
  message: string;
  agences: any[] = [];
  station: any[] = [];

  referenceRegion: string;
  refSapLeoni:string;
  longitude:number;
  latitude:number;

  rayon:number;
  id:number;





  constructor(private chaufservice: CircuitService, private formBuilder: FormBuilder,private stationService: StationService,private route: ActivatedRoute, private agenceService: AgenceService) { }

 
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.referenceRegion = params['referenceRegion'];
     
      this.refSapLeoni = params['refSapLeoni'];
      this.longitude = params['longitude'];
      this.latitude = params['latitude'];
      this.rayon = params['rayon'];
     
    
      console.log(params);
      
    });
  
    this.chauffeurForm = this.formBuilder.group({
      refSapLeoni: [this.refSapLeoni, Validators.required],
      referenceRegion: [this.referenceRegion, Validators.required],
      
      longitude: [this.longitude, Validators.required],
      latitude: [this.latitude, Validators.required],

      rayon: [this.rayon, Validators.required],
     
    });
 
  
  this.chauffeurForm.setValue({
    refSapLeoni: this.refSapLeoni ,
    referenceRegion: this.referenceRegion ,
    longitude: this.longitude ,
    latitude: this.latitude ,
    rayon: this.rayon ,
  
    
  });


  }
  
  

  updateChauf(): void {
    const token = localStorage.getItem('token');


    
    const updatedChauffeur: Station = {

      id:this.id,
      refSapLeoni: this.chauffeurForm.get('refSapLeoni').value,
      referenceRegion: this.chauffeurForm.get('referenceRegion').value,
      longitude: this.chauffeurForm.get('longitude').value,
      latitude: this.chauffeurForm.get('latitude').value,
      rayon: this.chauffeurForm.get('rayon').value,
     
      
    };

   
   
    this.stationService.updateStation(this.id, updatedChauffeur).subscribe(() => {
      console.log(updatedChauffeur.id)
      
      this.message = 'Station mise à jour';
     
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


