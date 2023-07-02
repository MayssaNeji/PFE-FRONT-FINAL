import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Audit } from 'Models/Audit';
import { AuditService } from 'Services/Audit.service';


@Component({
  selector: 'app-etat-audit',
  templateUrl: './etat-audit.component.html',
  styleUrls: ['./etat-audit.component.css']
})
export class EtatAuditComponent implements OnInit {

  data: any[] = [];
    message: string = '';
    Search:string = '';
    filteredData: any[] = [];
    searchKeyword: string = '';
    constructor(private Auditservice:AuditService ,private router: Router) { }
  
    ngOnInit() {
      this.GetAll();
    }
  
  
  
  
  
    GetAll(){
      this.Auditservice.GetAll()
      .subscribe(data => {
        this.data = data;
      });
    }


    navigateToView(audit:Audit): void {
      this.router.navigate(['/ViewDetAudit',audit.commentaires,audit.feux,audit.maintenance,audit.chaises,audit.pneux,
      audit.vitres,audit.assurance,audit.carteProfessionelle,audit.contratLeoni,audit.contratLeoni,
      audit.horraires,audit.comportements]);
    }
    


}
