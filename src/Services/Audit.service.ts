import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Audit } from 'Models/Audit';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuditService{
  
    constructor(private http:HttpClient) {}
  
    public GetAll():Observable<any> {
      return this.http.get<any>(
        'https://localhost:7171/api/Audits/GetAllAudits'
      );
    }
  
    public CreateAudit(Audit:Audit):Observable<any> {
      return this.http.post<any>(
        'https://localhost:7171/api/Audits/PostAudit',Audit
      );
    }
  
    public updateAudit(id: number, Audit: Audit): Observable<any> {
      return this.http.put<any>(
        
      
        `https://localhost:7171/api/Audits/PutAudit?id=${id}`,
        Audit
      );
    }
    
   

    public DeleteAudit(id: number): Observable<number> {
     

        return this.http.delete<number>(
          `https://localhost:7171/api/Audits/`+id
        );

    
    }
    
     
      

    public SearchAudit(id: number): Observable<any> {
      return this.http.get<any>(
        `https://localhost:7171/api/Audits/GetAudit?id=${id}`
      );
    }
    
    




  
  }
  