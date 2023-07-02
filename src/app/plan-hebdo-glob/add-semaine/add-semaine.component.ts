import { Component } from '@angular/core';
import { ChauffeurService } from 'Services/chauffeur.service';
import { EmployeService } from 'Services/Employe.service';
import { SegService } from 'Services/seg.sevice';
import { Segment } from 'Models/Segment';
import { Shift } from 'Models/Shift';
import { ShiftService } from 'Services/Shift.service';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PlanSegmentService } from 'Services/PlanSegment.service';
declare var $: any;


@Component({
  selector: 'app-add-semaine',
  templateUrl: './add-semaine.component.html',
  styleUrls: ['./add-semaine.component.css']
})
export class AddSemaineComponent {

  message: string = '';
  ok: boolean = true;

  
  data: any[] = [];
  selectedShift: any;

  chauffeurForm: FormGroup = new FormGroup({
   
  refSemaine: new FormControl('', Validators.required),
   
  });

  constructor(
    private PlanSegmentService: PlanSegmentService, private router: Router
  
  ) {}


  GetAll(refSemaine: string) {
    this.PlanSegmentService.GetAll()
      .subscribe(data => {
        this.data = data;
  
        console.log(refSemaine);
        console.log(this.data);
  
        const matchingItems = this.data.filter(item => item.refSemaine.trim() === refSemaine.trim());
  
        if (matchingItems.length > 0) {
          if (confirm("Cette planification est déja existante ,Voulez-vous continuer?")){
            this.router.navigate(['/add-planSegment'], { queryParams: { refSemaine: refSemaine } });
          }
        
          this.ok = false;
          
        } else {
if (refSemaine==''){
  this.message = "la reference de semaine est vide";
  this.showNotification('top', 'center', 'danger', this.message);
} else{
  this.message = "OK";
  this.ok = true;
  this.router.navigate(['/add-planSegment'], { queryParams: { refSemaine: refSemaine } });
  console.log( refSemaine)
  this.showNotification('top', 'center', 'success', this.message);
}

      
        }
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