import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Segment } from '../Models/Segment';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SegService {
  baseURL='https://localhost:7171/api/Segments/Delete';
    constructor(private http:HttpClient) {}
  
    public GetAll():Observable<any> {
      return this.http.get<any>(
        'https://localhost:7171/api/Segments/GetAllSegments'
      );
    }
  
    public CreateSeg(segment:Segment):Observable<any> {
      return this.http.post<any>(
        'https://localhost:7171/api/Segments/PostSegment',segment
      );
    }
  
    public updateSeg(Nom: string, segment: Segment): Observable<any> {
      return this.http.put<any>(
        
      
        `https://localhost:7171/api/Segments/Update?Nom=${Nom}`,
        segment
      );
    }
    
    delete(id: number): Observable<any> {
      return this.http.delete(`${this.baseURL}/${id}`);
    }

    public DeleteSeg(id: number): Observable<number> {
     

        return this.http.get<number>(
          `https://localhost:7171/api/Segments/`+id
        );

    
    }
    
     
      

    public SearchSeg(nom: string): Observable<any> {
      return this.http.get<any>(
        `https://localhost:7171/api/Segments/GetSegment?nom=${nom}`
      );
    }
    
    

    uploadEmpList(fileInput: any): Observable<any> {
      const file: File = fileInput.files[0];
      const formData: FormData = new FormData();
      formData.append('file', file);
  
      return this.http.post<any>(
        'https://localhost:7171/api/Segments/UploadExcelFile',
        formData
      );
    }


  
  }
  