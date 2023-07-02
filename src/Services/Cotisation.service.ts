import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cotisation } from 'Models/Cotisation';
@Injectable({
  providedIn: 'root'
})
export class CotisationService {

    constructor(private http:HttpClient) {}
  


    public GetAll():Observable<any> {
      return this.http.get<any>(
        'https://localhost:7171/api/Cotisations/GetCotisations'
      );
    }
  
    public CreateCotisation(annee: string,mois:string,ps:string):Observable<any> {
      return this.http.post<any>(
        `https://localhost:7171/api/Cotisations/PostCotisation?Annee=${annee}&Mois=${mois}&Ps=${ps}`, {}
      );
    }
  
    public updateCotisation(id: string, agence: Cotisation): Observable<any> {
      return this.http.put<any>(
        
      
        `https://localhost:7171/api/Cotisations/PutCotisation?id=${id}`,
        agence
      );
    }
    
   

    public DeleteCotisation(id: string): Observable<any> {
     

        return this.http.delete<any>(
        
          `https://localhost:7171/api/Cotisations/${id}`
        );

    
    }
    
     
      

    public SearchCotisation(id: string): Observable<any> {
      return this.http.get<any>(
        `https://localhost:7171/api/Cotisations/GetCotisation?id=${id}`
      );
    }
    
    



  }
  
  
  