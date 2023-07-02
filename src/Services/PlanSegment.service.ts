import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { PlanSegment } from 'Models/PlanSegment';
@Injectable({
  providedIn: 'root'
})
export class PlanSegmentService{
 
    constructor(private http:HttpClient) {}
  
    public GetAll():Observable<any> {
      return this.http.get<any>(
        `https://localhost:7171/api/PlanSegments/GetAllPlanSegments`
      );
    }
  
    public CreatePlanSegment(planSegment:PlanSegment):Observable<any> {
      return this.http.post<any>(
        `https://localhost:7171/api/PlanSegments/PostPlanSegment`,planSegment
      );
    }
  
    public updatePlanSegment(id: number, planSegment: PlanSegment): Observable<any> {
      return this.http.put<any>(
        
      
        `https://localhost:7171/api/PlanSegments/PutPlanSegment?id=${id}`,
        planSegment
      );
    }
    
   

    public DeletePlanSegment(id: string): Observable<string> {
     

        return this.http.delete<string>(
          `https://localhost:7171/api/PlanSegments/`+id
        );

    
    }
    
     
      

    public SearchPlanSegment(id: number): Observable<any> {
      return this.http.get<any>(
        `https://localhost:7171/api/PlanSegments/GetPlanSegments?id=${id}`
      );
    }
    
    




  
  }
  