
import { ChauffeurService } from 'Services/chauffeur.service';
import { AgenceService } from 'Services/agence.service';
import { Chauffeur } from 'Models/Chauffeur';
import { FormControl } from '@angular/forms';

import { map } from 'rxjs/operators';
import { AuditService } from 'Services/Audit.service';
import { Audit } from 'Models/Audit';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit{

  
  message: string='';
  ok: boolean=true;

  chauffeur: any[] = [];
  chauff: any[] = [];



  

  AuditForm: FormGroup = new FormGroup({
      nomAuditeur: new FormControl('', Validators.required),
      resultat: new FormControl('', Validators.required),
      dateAudit: new FormControl('', Validators.required),
      bus: new FormControl('', Validators.required),
     
      personneAuditee: new FormControl(''),
      feux: new FormControl(false),
      maintenance: new FormControl(false),
      chaises: new FormControl(false),
      pneux: new FormControl(false),
      vitres: new FormControl(false),
      assurance: new FormControl(false),
      carteProfessionelle: new FormControl(false),
      contratLeoni: new FormControl(false),
      horraires: new FormControl(false),
      comportements: new FormControl(false),
      commentaires: new FormControl(''),
     
   
  
  });

  constructor(
    private Audit:AuditService,
    private chauffeurService: ChauffeurService
    ,private router: Router, private formBuilder: FormBuilder
    
  ) { 
    this.chauffeurService.GetAll().subscribe(data => {
      this.chauffeur = data;
    });
  }

  ngOnInit() {
    this.AuditForm = this.formBuilder.group({
      nomAuditeur: ['', Validators.required],
      resultat: ['', Validators.required],
      dateAudit: ['', Validators.required],
      bus: ['', Validators.required],
      personneAuditee: [''],
      feux: [false],
      maintenance: [false],
      chaises: [false],
      pneux: [false],
      vitres: [false],
      assurance: [false],
      carteProfessionelle: [false],
      contratLeoni: [false],
      horraires: [false],
      comportements: [false],
      commentaires: [''],
    });
  }



 



  
  CreateAudit() {

    this.AuditForm.valueChanges.subscribe(val => {
      console.log(val);
    });
    if (this.AuditForm.invalid) {
      console.log('Form is invalid');
      console.log(this.AuditForm.controls['bus'].value);
      console.log(this.AuditForm.controls['dateAudit'].value);
      console.log(this.AuditForm.controls['commentaires'].value);
      console.log(this.AuditForm.controls['nomAuditeur'].value);
      console.log(this.AuditForm.controls['personneAuditee'].value);

      console.log(this.AuditForm.controls['feux'].value);
      console.log(this.AuditForm.controls['maintenance'].value);
      console.log(this.AuditForm.controls['pneux'].value);
      console.log(this.AuditForm.controls['vitres'].value);
      console.log(this.AuditForm.controls['assurance'].value);
      
      console.log(this.AuditForm.controls['carteProfessionelle'].value);
      console.log(this.AuditForm.controls['contratLeoni'].value);
      console.log(this.AuditForm.controls['horraires'].value);
      console.log(this.AuditForm.controls['comportements'].value);
     
     
    
      return;
    }


   

   
  
      const newChauffeur: Audit = {
        bus: this.AuditForm.controls['bus'].value,
        resultat: this.AuditForm.controls['resultat'].value,
        feux: this.AuditForm.controls['feux'].value,
        maintenance: this.AuditForm.controls['maintenance'].value,
        chaises: this.AuditForm.controls['chaises'].value,
        pneux: this.AuditForm.controls['pneux'].value,
        vitres: this.AuditForm.controls['vitres'].value,
        assurance: this.AuditForm.controls['assurance'].value,
        carteProfessionelle: this.AuditForm.controls['carteProfessionelle'].value,
        contratLeoni: this.AuditForm.controls['contratLeoni'].value,
        horraires: this.AuditForm.controls['horraires'].value,
        comportements: this.AuditForm.controls['comportements'].value,
        dateAudit: this.AuditForm.controls['dateAudit'].value,
        commentaires: this.AuditForm.controls['commentaires'].value,
        nomAuditeur: this.AuditForm.controls['nomAuditeur'].value,
      
        personneAuditee: this.AuditForm.controls['personneAuditee'].value,
        
      };



      







      // call createchauf method of chauffeur service
      this.Audit.CreateAudit(newChauffeur).subscribe(() => {
        this.message = 'Audit ajouté avec succès';
        this.ok = true;
       
        this.showNotification('top', 'center', 'success');
      }, () => {
        this.message = 'Creation failed';

        console.log(this.AuditForm.controls['bus'].value);
        console.log(this.AuditForm.controls['dateAudit'].value);
        
        console.log(this.AuditForm.controls['nomAuditeur'].value);
        console.log(this.AuditForm.controls['personneAuditee'].value);
        console.log(this.AuditForm.controls['commentaires'].value);
        console.log(this.AuditForm.controls['feux'].value);
        console.log(this.AuditForm.controls['maintenance'].value);
        console.log(this.AuditForm.controls['pneux'].value);
        console.log(this.AuditForm.controls['vitres'].value);
        console.log(this.AuditForm.controls['assurance'].value);
        
        console.log(this.AuditForm.controls['carteProfessionelle'].value);
        console.log(this.AuditForm.controls['contratLeoni'].value);
        console.log(this.AuditForm.controls['horraires'].value);
        console.log(this.AuditForm.controls['comportements'].value);
        
       


        this.ok = false;
        this.showNotification('top', 'center', 'danger');
      });
      this.router.navigate(['/audit']);
    };
  
  
  showNotification(from: string, align: string, type: string) {
    let message: string;
  
    if (type === 'success') {
      message = 'Audit ajouté avec succès';
    } else if (type === 'danger') {
      message = 'Verifier les types des entrées';
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
