import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { PlanHebdo } from 'Models/PlanHedo'; 
@Injectable({
  providedIn: 'root'
})
export class PlanHebdoService{
 
    constructor(private http:HttpClient) {}
  
    public GetAll():Observable<any> {
      return this.http.get<any>(
        `https://localhost:7171/api/PlanHebdoes`
      );
    }
  
    public createEmploye(annee: string, mois: string, refSemaine: string): Observable<any> {
        return this.http.post<any>(
          `https://localhost:7171/api/PlanHebdoes/PostPlanHebdo?targetAnnee=${annee}&targetMois=${mois}&targetRefSemaine=${refSemaine}`, {}
        );
      }
      
  
    public updatePlan(id: number, Employe: PlanHebdo): Observable<any> {
      return this.http.put<any>(
        
      
        `https://localhost:7171/api/PlanHebdoes/PutPlanHebdo?id=${id}`,
        Employe
      );
    }
    
   

    public DeleteEmploye(matricule: number): Observable<any> {
     

        return this.http.delete<any>(
          `https://localhost:7171/api/PlanHebdoes/`+matricule
        );

    
    }
    
     
      

    public SearchPlan(matricule:number): Observable<any> {
      return this.http.get<any>(
        `https://localhost:7171/api/PlanHebdoes/GetPlanHebdo?id=${matricule}`
      );
    }
    
   
    
  }
  