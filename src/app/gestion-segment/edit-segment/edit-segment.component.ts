import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SegService } from 'Services/seg.sevice'; 
import { ActivatedRoute } from '@angular/router';
import { Segment } from 'Models/Segment'; 
import { AgenceService } from 'Services/agence.service';
import { map } from 'rxjs/operators';
import { UserService } from 'Services/user.service';
declare var $: any;
@Component({
  selector: 'app-edit-segment',
  templateUrl: './edit-segment.component.html',
  styleUrls: ['./edit-segment.component.css']
})
export class EditSegmentComponent implements OnInit {

 
  @Input() chauffeur: Segment;
  chauffeurForm: FormGroup;
  message: string;
  chefSegment: any[] = [];
  RHSegment: any[] = [];
  id: number;
  nom: string;
  centreDeCout: string;
  nomSegSapRef: number;
  rhSegment: number;
  chefDeSegment: string;


  constructor(
    private chaufservice: SegService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userservice:UserService
  ) {


    userservice.GetAllUsers().subscribe(data => {
      this.chefSegment = data.filter(user => user.role === "Chef de Segment");
      console.log(this.chefSegment)
    });
    

    userservice.GetAllUsers().subscribe(data => {
      this.RHSegment = data.filter(user => user.role === "RH Segment");
      console.log(this.RHSegment)
    });
    
    
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.nom = params['nom'];
      this.centreDeCout = params['centreDeCout'];
      this.nomSegSapRef = params['nomSegSapRef'];
      this.rhSegment = params['rhSegment'];
      this.chefDeSegment = params['chefDeSegment'];
     

      console.log(params);

      this.chauffeurForm = this.formBuilder.group({
        nom: [this.nom, Validators.required],
        centreDeCout: [this.centreDeCout, Validators.required],
      
        nomSegSapRef: [this.nomSegSapRef, Validators.required],
        rhSegment: [this.rhSegment, Validators.required],
        id: [''],
        chefDeSegment: [this.chefDeSegment, Validators.required]
      });

      
      this.chauffeurForm.patchValue({
        nom: this.nom,
        centreDeCout: this.centreDeCout,
       
        nomSegSapRef: this.nomSegSapRef,
        rhSegment: this.rhSegment,
        chefDeSegment: this.chefDeSegment
      });
    });
  }

  updateChauf(): void {
    const token = localStorage.getItem('token');

    const updatedChauffeur: Segment = {
      id: this.id,
      nom: this.chauffeurForm.get('nom').value,
      centreDeCout: this.chauffeurForm.get('centreDeCout').value,
     
      nomSegSapRef: this.chauffeurForm.get('nomSegSapRef').value,
      rhSegment: this.chauffeurForm.get('rhSegment').value,
      chefDeSegment: this.chauffeurForm.get('chefDeSegment').value,
    };

    console.log(updatedChauffeur.nom);

    this.chaufservice.updateSeg(this.nom, updatedChauffeur).subscribe(
      () => {
        console.log(updatedChauffeur.id);
      
        this.message = 'Vehicule mis à jour';
       
     
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
