import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Station } from 'Models/Station';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StationService {
  
    constructor(private http:HttpClient) {}
  
    public GetAll():Observable<any> {
      return this.http.get<any>(
        'https://localhost:7171/api/Stations/GetAllStations'
        
      );
    }
  
    public CreateStation(Station:Station):Observable<any> {
      return this.http.post<any>(
        'https://localhost:7171/api/Stations/PostStation',Station
      );
    }
  
    public updateStation(id: number, Station: Station): Observable<any> {
      return this.http.put<any>(
        
      
        `https://localhost:7171/api/Stations/PutStation?id=${id}`,
        Station
      );
    }
    
   

    public DeleteStation(id: number): Observable<number> {
      return this.http.delete<number>(
        `https://localhost:7171/api/Stations/${id}`
      );
    }
    
      

    public SearchStation(id: number): Observable<any> {
      return this.http.get<any>(
        `https://localhost:7171/api/Stations/GetStation?id=${id}`
      );
    }
    
    

    uploadEmpList(fileInput: any): Observable<any> {
      const file: File = fileInput.files[0];
      const formData: FormData = new FormData();
      formData.append('file', file);
  
      return this.http.post<any>(
        'https://localhost:7171/api/Stations/UploadExcelFile',
        formData
      );
    }


  
  }
  