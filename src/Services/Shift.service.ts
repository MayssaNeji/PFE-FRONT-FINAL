import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Shift } from 'Models/Shift';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ShiftService{
 
    constructor(private http:HttpClient) {}
  
    public GetAll():Observable<any> {
      return this.http.get<any>(
        'https://localhost:7171/api/Shifts/GetAllShifts'
      );
    }
  
    public CreateShift(Shift:Shift):Observable<any> {
      return this.http.post<any>(
        'https://localhost:7171/api/Shifts/PostShift',Shift
      );
    }
  
    public updateShift(Nom: string, Shift: Shift): Observable<any> {
      return this.http.put<any>(
        
      
        `https://localhost:7171/api/Shifts/PutShift?Nom=${Nom}`,
        Shift
      );
    }
    
   

    public DeleteShift(id: string): Observable<string> {
     

        return this.http.delete<string>(
          `https://localhost:7171/api/Shifts/`+id
        );

    
    }
    
     
      

    public SearchChauf(Nom: string): Observable<any> {
      return this.http.get<any>(
        `https://localhost:7171/api/Shifts/GetShift?Nom=${Nom}`
      );
    }
    
    




  
  }
  