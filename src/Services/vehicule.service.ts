import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Vehicule } from '../Models/Vehicule';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {

  constructor(private http:HttpClient) {}
  
    public GetAll():Observable<any> {
      return this.http.get<any>(
        'https://localhost:7171/api/Vehicules/GetAllVehicules'
      );
    }
  
    public Createvehicule(vehicule:Vehicule):Observable<any> {
      return this.http.post<any>(
        'https://localhost:7171/api/Vehicules/PostVehicule',vehicule
      );
    }
  
    public updatevehicule(id: number, vehicule: Vehicule): Observable<any> {
      return this.http.put<any>(
        
      
        `https://localhost:7171/api/Vehicules/PutVehicule?id=${id}`,
        vehicule
      );
    }
    
   

    public Deletevehicule(id: number): Observable<number> {
     

        return this.http.delete<number>(
          `https://localhost:7171/api/Vehicules/DeleteVehicule?id=${id}`
        );

    
    }
    
     
      

    public Searchvehicule(id: number): Observable<any> {
      return this.http.get<any>(
        `https://localhost:7171/api/Vehicules/GetVehicule?id=${id}`
      );
    }
    
    



}
