import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agence } from '../Models/Agence';
@Injectable({
  providedIn: 'root'
})
export class AgenceService {


  baseURL='https://localhost:7171/api/Segments/Delete';
    constructor(private http:HttpClient) {}
  
    public GetAllAgence():Observable<any> {
      return this.http.get<any>(
        'https://localhost:7171/api/Agences/GetAllAgences'
      );
    }
  
    public CreateAgence(agence:Agence):Observable<any> {
      return this.http.post<any>(
        'https://localhost:7171/api/Agences/PostAgence/',agence
      );
    }
  
    public updateAgence(id: number, agence: Agence): Observable<any> {
      return this.http.put<any>(
        
      
        `https://localhost:7171/api/Agences/PutAgence?id=${id}`,
        agence
      );
    }
    
   

    public DeleteAgence(id: string): Observable<any> {
     

        return this.http.delete<any>(
        
          `https://localhost:7171/api/Agences/DeleteAgence?id=${id}`
        );

    
    }
    
     
      

    public SearchAgence(id: string): Observable<any> {
      return this.http.get<any>(
        `https://localhost:7171/api/Agences/GetAgence?id=${id}`
      );
    }
    
    



  }
  
  
  