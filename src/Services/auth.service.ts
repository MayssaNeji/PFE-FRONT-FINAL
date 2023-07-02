import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Compte } from '../Models/Compte';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) {}

  public register(compte:Compte):Observable<any> {
    return this.http.post<any>(
      'https://localhost:7171/api/Auth/register' ,
      compte
    );
  }

  public login(compte:Compte,password:string):Observable<{message: string, token: string}> {
    return this.http.post<{message: string, token: string}>(
      'https://localhost:7171/api/Auth/login?password='+password ,
      compte
    );
  }

  public forgotpswd(email: string): Observable< string> {
  
    return this.http.post< string>(
      'https://localhost:7171/api/forgetpassword',
     {email:email}
    );
  }

}
