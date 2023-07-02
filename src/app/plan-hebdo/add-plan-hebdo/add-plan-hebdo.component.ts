import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlanHebdo } from 'Models/PlanHedo';
import { PlanHebdoService } from 'Services/PlanHedo.service';
import { PlanSegmentService } from 'Services/PlanSegment.service';
declare var $: any;
@Component({
  selector: 'app-add-plan-hebdo',
  templateUrl: './add-plan-hebdo.component.html',
  styleUrls: ['./add-plan-hebdo.component.css']
})
export class AddPlanHebdoComponent implements OnInit {
  data: any[] = [];
  years: number[] = [];
  refSemaines: any[] = [];
  message: string='';


  PlanHebdo: FormGroup = new FormGroup({
    refSemaine: new FormControl('', Validators.required),
    mois: new FormControl('', Validators.required),
    annee: new FormControl('', Validators.required),
  });


  constructor(private planseg:PlanSegmentService,
     private PlanHebdooo:PlanHebdoService,) {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
      this.years.push(year);
    }
  }
  ngOnInit(): void {
    this.planseg.GetAll().subscribe(data => {
      this.data = data;
      const uniqueRefSemaines = Array.from(new Set(data.map(item => item.refSemaine)));
  
      // Sort refSemaines in ascending order (oldest to newest)
      this.refSemaines = uniqueRefSemaines.sort((a, b) => {
        const dateA: Date = new Date(a as string);
        const dateB: Date = new Date(b as string);
        return dateA.getTime() - dateB.getTime();
      });
    });
  }
  





  CreatePlan() {
    // check if form is valid
    if (this.PlanHebdo.invalid) {
      console.log('Form is invalid');
      return;
    }
    this.PlanHebdo.valueChanges.subscribe(val => {
      console.log(val);
    });
    
      const newChauffeur: PlanHebdo = {
        refSemaine: this.PlanHebdo.controls['refSemaine'].value,
        annee: this.PlanHebdo.controls['annee'].value,
        mois: this.PlanHebdo.controls['mois'].value,
     
      };
      // call createchauf method of chauffeur service
      this.PlanHebdooo.createEmploye(newChauffeur.annee,newChauffeur.mois,newChauffeur.refSemaine).subscribe(() => {
        this.message = 'Planification Hebdomadaire crée avec succès';
     
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
          this.message = 'erreur de creation';
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
