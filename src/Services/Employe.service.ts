import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Employe } from 'Models/Employe';
@Injectable({
  providedIn: 'root'
})
export class EmployeService{
 
    constructor(private http:HttpClient) {}
  
    public GetAll():Observable<any> {
      return this.http.get<any>(
        `https://localhost:7171/api/Employes/GetAllEmployes`
      );
    }
  
    public CreateEmploye(Employe:Employe ):Observable<any> {
      return this.http.post<any>(
        `https://localhost:7171/api/Employes/PostEmploye`,Employe
      );
    }
  
    public updateEmploye(id: number, Employe: Employe): Observable<any> {
      return this.http.put<any>(
        
      
        `https://localhost:7171/api/Employes/PutEmploye?id=${id}`,
        Employe
      );
    }
    
   

    public DeleteEmploye(matricule: number): Observable<any> {
     

        return this.http.delete<any>(
          `https://localhost:7171/api/Employes/`+matricule
        );

    
    }
    
     
      

    public SearchEmploye(matricule:number): Observable<any> {
      return this.http.get<any>(
        `https://localhost:7171/api/Employes/GetEmploye?matricule=${matricule}`
      );
    }
    
    uploadEmpList(fileInput: any): Observable<any> {
      const file: File = fileInput.files[0];
      const formData: FormData = new FormData();
      formData.append('file', file);
  
      return this.http.post<any>(
        'https://localhost:7171/api/Employes/UploadExcelFile',
        formData
      );
    }
    
  }
  