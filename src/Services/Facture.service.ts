import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facture } from 'Models/Facture'; 
@Injectable({
  providedIn: 'root'
})
export class FactureService {
  private apiUrl = 'https://localhost:7171/api/Factures';
    constructor(private http:HttpClient) {}
  


    public GetAll():Observable<any> {
      return this.http.get<any>(
        'https://localhost:7171/api/Factures/GetFactures'
      );
    }
  
    public CreateCotisation(annee: number,mois:number,agence:string):Observable<any> {
      return this.http.post<any>(
        `https://localhost:7171/api/Factures/PostFacture?Annee=${annee}&Mois=${mois}&agence=${agence}`, {}
      );
    }
  
    public updateCotisation(id: string, agence: Facture): Observable<any> {
      return this.http.put<any>(
        
      
        `https://localhost:7171/api/Factures/PutFacture?id=${id}`,
        agence
      );
    }
    
   

    public DeleteCotisation(id: string): Observable<any> {
     

        return this.http.delete<any>(
        
          `https://localhost:7171/api/Factures/${id}`
        );

    
    }
    
     
      

    public SearchCotisation(annee: number,mois:number,agence:string): Observable<any> {
      return this.http.get<any>(
        `https://localhost:7171/api/Factures/GetFacture?Annee=${annee}&Mois=${mois}&agence=${agence}`
      );
    }
    sendMail(formData: FormData, mail: string): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/SendEmail`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        params: { mail } 
      });
    }
  }
  
  
  