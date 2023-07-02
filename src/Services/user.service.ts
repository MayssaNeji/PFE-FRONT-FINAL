import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
;
import { Compte } from '../Models/Compte';


@Injectable({
  providedIn: 'root'
})
export class UserService {





 
    constructor(private http:HttpClient) {}
  
    public GetAllUsers():Observable<any> {
      return this.http.get<any>(
        `https://localhost:7171/api/User/GetAllComptes`
      );
    }
  
    public CreateUser(user:Compte):Observable<any> {
      return this.http.post<any>(
        'https://localhost:7171/api/User/AddCompte',user
      );
    }
  
    public updateUser(id: number, user: Compte): Observable<any> {
      return this.http.put<any>(
        
      
        `https://localhost:7171/api/User/PutCompte?id=${id}`,
        user
      );
    }
    
    public register(compte:Compte ,password:string):Observable<any> {
      return this.http.post<any>(
        `https://localhost:7171/api/Auth/register?Password=${password}` ,
        compte
      );
    }
  

    public DeleteUser(id: number): Observable<any> {
     

        return this.http.delete<any>(
        
          `https://localhost:7171/api/User/${id}`
        );

    
    }

    public UploadExcelFile(file:any):Observable<any> {
      return this.http.post<any>(
        `https://localhost:7171/api/User/UploadExcelFile`,file
      );
    }

  
  
    
     
      

    public SearchUser(id: number): Observable<any> {
      return this.http.get<any>(
        `https://localhost:7171/api/User/GetCompte?id=${id}`
      );
    }
    
    



  }
  
  
  