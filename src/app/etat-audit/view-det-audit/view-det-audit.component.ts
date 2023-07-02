import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuditService } from 'Services/Audit.service';

@Component({
  selector: 'app-view-det-audit',
  templateUrl: './view-det-audit.component.html',
  styleUrls: ['./view-det-audit.component.css']
})
export class ViewDetAuditComponent implements OnInit {
  @Input()
  message: string = '';
  ok: boolean = true;

  agences: any[] = [];
  userForm: FormGroup;
 
  commentaires: string;
  feux: string;
  maintenance: string;
  chaises: string;
  pneux: string;
  vitres: string;
  assurance: string;
  carteProfessionelle: string;
  contratLeoni: string;
  horraires: string;
  comportements: string;

  constructor(
    private auditserv: AuditService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      commentaires: ['', Validators.required],
      feux: ['', Validators.required],
      maintenance: ['', Validators.required],
      chaises: ['', Validators.required],
      pneux: ['', Validators.required],
      vitres: [''],
      assurance: [''],
      carteProfessionelle: ['', Validators.required],
      contratLeoni: ['', Validators.required],
      horraires: ['', Validators.required],
      comportements: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.commentaires = params['commentaires'];
      if(params['feux'] === 'true' )
      {
        this.feux ='1'
      }
      else
      {
        this.feux ='0'
      }
    
     
      

      if(params['maintenance'] === 'true' )
      {
        this.maintenance ='1'
      }
      else
      {
        this.maintenance ='0'
      }


      if(params['chaises'] === 'true' )
      {
        this.chaises ='1'
      }
      else
      {
        this.chaises ='0'
      }




      if(params['pneux'] === 'true' )
      {
        this.pneux ='1'
      }
      else
      {
        this.pneux ='0'
      }



      if(params['vitres'] === 'true' )
      {
        this.vitres ='1'
      }
      else
      {
        this.vitres ='0'
      }




      if(params['assurance'] === 'true' )
      {
        this.assurance ='1'
      }
      else
      {
        this.assurance ='0'
      }




      if(params['carteProfessionelle'] === 'true' )
      {
        this.carteProfessionelle ='1'
      }
      else
      {
        this.carteProfessionelle ='0'
      }




      if(params['contratLeoni'] === 'true' )
      {
        this.contratLeoni ='1'
      }
      else
      {
        this.contratLeoni ='0'
      }




      if(params['horraires'] === 'true' )
      {
        this.horraires ='1'
      }
      else
      {
        this.horraires ='0'
      }




      if(params['comportements'] === 'true' )
      {
        this.comportements ='1'
      }
      else
      {
        this.comportements ='0'
      }




      
      

      console.log(this.commentaires);
      console.log(this.carteProfessionelle);

      this.userForm.patchValue({
        commentaires: this.commentaires,
        feux: this.feux,
        maintenance: this.maintenance,
        chaises: this.chaises,
        pneux: this.pneux,
        vitres: this.vitres,
        assurance: this.assurance,
        carteProfessionelle: this.carteProfessionelle,
        contratLeoni: this.contratLeoni,
        horraires: this.horraires,
        comportements: this.comportements
      });
    });
  }
}
