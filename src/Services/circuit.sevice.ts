import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Circuit } from 'Models/Circuit';
@Injectable({
  providedIn: 'root'
})
export class CircuitService{
 
    constructor(private http:HttpClient) {}
  
    public GetAll():Observable<any> {
      return this.http.get<any>(
        'https://localhost:7171/api/Circuits/GetAllCircuits'
      );
    }
  
    public CreateCircuit(circuit:Circuit):Observable<any> {
      return this.http.post<any>(
        'https://localhost:7171/api/Circuits/PostCircuit',circuit
      );
    }
  
    public updateCircuit(id: number, circuit: Circuit): Observable<any> {
      return this.http.put<any>(
        
      
        `https://localhost:7171/api/Circuits/PutCircuit?id=${id}`,
        circuit
      );
    }
    
   

    public DeleteCircuit(id: number): Observable<number> {
     

        return this.http.delete<number>(
          `https://localhost:7171/api/Circuits/DeleteCircuit?id=${id}`
        );

    
    }
    
     
      

    public SearchCircuit(id: number): Observable<any> {
      return this.http.get<any>(
        `https://localhost:7171/api/Circuits/GetCircuit?id=${id}`
      );
    }
    
    

    uploadEmpList(fileInput: any): Observable<any> {
      const file: File = fileInput.files[0];
      const formData: FormData = new FormData();
      formData.append('file', file);
  
      return this.http.post<any>(
        'https://localhost:7171/api/Circuits/UploadExcelFile',
        formData
      );
    }


  
  }
  