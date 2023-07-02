import { Component, OnInit } from '@angular/core';
import { ChauffeurService } from 'Services/chauffeur.service';
import { EmployeService } from 'Services/Employe.service';
import { SegService } from 'Services/seg.sevice';
import { Segment } from 'Models/Segment';
import { Shift } from 'Models/Shift';
import { ShiftService } from 'Services/Shift.service';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { PlanSegment } from 'Models/PlanSegment';
import { PlanSegmentService } from 'Services/PlanSegment.service';
import { ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-add-plan-segment',
  templateUrl: './add-plan-segment.component.html',
  styleUrls: ['./add-plan-segment.component.css']
})
export class AddPlanSegmentComponent implements OnInit  {

  message: string = '';
  ok: boolean = true;

  refSemaine: string = '';
  employe: any[] = [];
  segment: any[] = [];
  shift: any[] = [];
  selectedShift: any;

  chauffeurForm: FormGroup = new FormGroup({
    matricule: new FormControl('', Validators.required),
    nom: new FormControl('', Validators.required),
    samedi: new FormControl('', Validators.required),
    dimanche: new FormControl('', Validators.required),
    lundi: new FormControl('', Validators.required),
    mardi: new FormControl('', Validators.required),
    mercredi: new FormControl('', Validators.required),
    jeudi: new FormControl('', Validators.required),
    vendredi: new FormControl('', Validators.required),
    segment: new FormControl('', Validators.required),
    refSemaine: new FormControl('', Validators.required),
    shift: new FormControl('', Validators.required),
    matriculeNavigation: new FormControl('', Validators.required),
    segmentNavigation: new FormControl('', Validators.required),
    Annee: new FormControl(''),
    Mois: new FormControl('')
  });

  constructor(
    private PlanSegmentService: PlanSegmentService,
    private EmployeService: EmployeService,
    private route: ActivatedRoute,
    private SegService: SegService,
    private ShiftService: ShiftService,
  ) {
    this.EmployeService.GetAll().subscribe(data => {
      this.employe = data;
    });

    this.SegService.GetAll().subscribe(data => {
      this.segment = data;
    });
    this.ShiftService.GetAll().subscribe(data => {
      this.shift = data;
    });

    const currentYear = new Date().getFullYear().toString();
    const currentMonth = (new Date().getMonth() + 1).toString();
    console.log(currentMonth);

    this.chauffeurForm.controls['Annee'].setValue(currentYear);
    this.chauffeurForm.controls['Mois'].setValue(currentMonth);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.refSemaine = params['refSemaine'];

    });
    console.log( this.refSemaine)
  }

  Createchauf() {
    // check if form is valid
    this.chauffeurForm.valueChanges.subscribe(val => {
      console.log(val);
    });

    // get selected employee
    const matricule = this.chauffeurForm.controls['matriculeNavigation'].value;
    if (!matricule) {
      console.log('Employee not selected');
      return;
    }

    // retrieve employee data
    this.EmployeService.SearchEmploye(matricule).pipe(
      map(data => {
        return {
          matricule: data.matricule,
          nom: data.nom,
          prenom: data.prenom,
          contreMaitre: data.contreMaitre,
          nomDuGroupe: data.nomDuGroupe,
          ps: data.ps,
          telephone: data.telephone,
          centreDeCout: data.centreDeCout,
          segment: data.segment,
          station: data.station,
          shift: data.shift,
        };
      })
    ).subscribe(emp => {
      // get selected segment
      const segment = this.chauffeurForm.controls['segmentNavigation'].value;
      if (!segment) {
        console.log('Segment not selected');
        return;
      }

      // retrieve segment data
      this.SegService.SearchSeg(segment).pipe(
        map(data => {
          return {
            nom: data.nom,
            centreDeCout: data.centreDeCout,
            nomSegSapRef: data.nomSegSapRef,
            rhSegment: data.rhSegment,
            chefDeSegment: data.chefDeSegment,
            id: data.id,
          };
        })
      ).subscribe(seg => {
        // get selected shift
        const shift = emp.shift;

        // Assuming the shift value is already present in the employee data

        // retrieve shift data
        this.ShiftService.SearchChauf(shift).pipe(
          map(data => {
            return {
              samedi: data.samedi,
              dimanche: data.dimanche,
              lundi: data.lundi,
              mardi: data.mardi,
              mercredi: data.mercredi,
              jeudi: data.jeudi,
              vendredi: data.vendredi,
            };
          })
        ).subscribe(shiftData => {
          // Set shift values in form controls
          this.chauffeurForm.controls['samedi'].setValue(shiftData.samedi);
          this.chauffeurForm.controls['dimanche'].setValue(shiftData.dimanche);
          this.chauffeurForm.controls['lundi'].setValue(shiftData.lundi);
          this.chauffeurForm.controls['mardi'].setValue(shiftData.mardi);
          this.chauffeurForm.controls['mercredi'].setValue(shiftData.mercredi);
          this.chauffeurForm.controls['jeudi'].setValue(shiftData.jeudi);
          this.chauffeurForm.controls['vendredi'].setValue(shiftData.vendredi);

          // create new chauffeur object
          const newChauffeur: PlanSegment = {
            matricule: emp.matricule,
            prenom: emp.prenom,
            nom: emp.nom,
            shift: emp.shift,
            refSemaine: this.refSemaine,
            segment: seg.nom,
            samedi: this.chauffeurForm.controls['samedi'].value,
            dimanche: this.chauffeurForm.controls['dimanche'].value,
            lundi: this.chauffeurForm.controls['lundi'].value,
            mardi: this.chauffeurForm.controls['mardi'].value,
            mercredi: this.chauffeurForm.controls['mercredi'].value,
            jeudi: this.chauffeurForm.controls['jeudi'].value,
            vendredi: this.chauffeurForm.controls['vendredi'].value,
            Annee: this.chauffeurForm.controls['Annee'].value,
            Mois: this.chauffeurForm.controls['Mois'].value,
          };
console.log(newChauffeur)
          // call createPlanSegment method of PlanSegmentService
          this.PlanSegmentService.CreatePlanSegment(newChauffeur).subscribe(() => {
            this.message = 'Employé ajouté à la planification avec succès';
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
            this.showNotification('top', 'center', 'danger', this.message);
          });
        });
      });
    });
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
}
