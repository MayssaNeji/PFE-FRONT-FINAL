import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Chauffeur } from '../Models/Chauffeur';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ChauffeurService{
  baseURL='https://localhost:7171/api/Segments/Delete';
    constructor(private http:HttpClient) {}
  
    public GetAll():Observable<any> {
      return this.http.get<any>(
        'https://localhost:7171/api/Chauffeurs/GetAllChauffeurs'
      );
    }
  
    public Createchauf(chauffeurs:Chauffeur):Observable<any> {
      return this.http.post<any>(
        'https://localhost:7171/api/Chauffeurs/PostChauffeur/',chauffeurs
      );
    }
  
    public updateChauf(id: number, chauffeurs: Chauffeur): Observable<any> {
      return this.http.put<any>(
        
      
        `https://localhost:7171/api/Chauffeurs/PutChauffeur?id=${id}`,
        chauffeurs
      );
    }
    
   

    public DeleteChauf(id: number): Observable<number> {
     

        return this.http.delete<number>(
          `https://localhost:7171/api/Chauffeurs/`+id
        );

    
    }
    
     
      

    public SearchChauf(id: number): Observable<any> {
      return this.http.get<any>(
        `https://localhost:7171/api/Chauffeurs/search?id=${id}`
      );
    }
    
    




  
  }
  