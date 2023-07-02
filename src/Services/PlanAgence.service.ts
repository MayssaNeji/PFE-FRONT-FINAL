import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { PlanAgence } from 'Models/PlanAgence';
@Injectable({
  providedIn: 'root'
})
export class PlanAgenceService{
 
    constructor(private http:HttpClient) {}
  
    public GetAll():Observable<any> {
      return this.http.get<any>(
        `https://localhost:7171/api/PlanAgences/GetPlanAgences`
      );
    }
  
    public createEmploye(destination: string, Agence: string, refSemaine: string, navette: Number): Observable<any> {
        return this.http.post<any>(
          `  https://localhost:7171/api/PlanAgences/PostPlanAgence?refSemaine=${refSemaine}&Agence=${Agence}&destination=${destination}&navette=${navette}`, {}
        );
      }
    
  
    public updatePlan(id: number, Employe: PlanAgence): Observable<any> {
      return this.http.put<any>(
        
      
        `https://localhost:7171/api/PlanAgences/PutPlanAgence?id=1${id}`,
        Employe
      );
    }
    
   

    public DeleteEmploye(matricule: number): Observable<any> {
     

        return this.http.delete<any>(
          `https://localhost:7171/api/PlanAgences/`+matricule
        );

    
    }
    
     
      

    public SearchPlan(matricule:number): Observable<any> {
      return this.http.get<any>(
        `https://localhost:7171/api/PlanAgences/GetPlanAgence?id=${matricule}`
      );
    }
    
   
    SendMail(fileInput: any,mail:string): Observable<any> {
        const file: File = fileInput.files[0];
        const formData: FormData = new FormData();
        formData.append('file', file);
    
        return this.http.post<any>(
            `https://localhost:7171/api/PlanAgences/SendEmail?mail=${mail}`,
          formData
        );
      }
  
    
  }
  