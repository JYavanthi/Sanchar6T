import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URLS } from '../shared/API-URLs'

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  apiUrlGDS = API_URLS.BASE_URL;
  apiUrl = API_URLS.BASE_URL;

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'API-Key': API_URLS.KEY
  })
  httpGet(apiUrls: any, param: any = {}): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}${apiUrls}`, { headers: this.headers, params: param });
  }

  httpPost(apiUrls: any, param: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}${apiUrls}`, param, { headers: this.headers });
  }

  httpPut(apiUrls: any, param: any): Observable<any[]> {
    return this.http.put<any[]>(`${this.apiUrl}${apiUrls}`, param, { headers: this.headers });
  }

  httpDelete(apiUrls: any, param: any = {}): Observable<any[]> {
    return this.http.delete<any[]>(`${this.apiUrl}${apiUrls}`, { headers: this.headers, params: param });
  }


  httpGetNew(apiUrls: string, param?: any): Observable<any[]>;
  httpGetNew(apiUrls: string, param: any, responseType: 'blob'): Observable<Blob>;
  httpGetNew(apiUrls: string, param: any = {}, responseType: 'json' | 'blob' = 'json'): Observable<any> {
    const options: any = {
      headers: this.headers,
      params: param,
      responseType: responseType
    };
  
    return this.http.get(`${this.apiUrlGDS}${apiUrls}`, options);
  }
  

  httpPostNew(apiUrls: any, param: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrlGDS}${apiUrls}`, param, { headers: this.headers });
  }

  httpPutNew(apiUrls: any, param: any): Observable<any[]> {
    return this.http.put<any[]>(`${this.apiUrlGDS}${apiUrls}`, param, { headers: this.headers });
  }

  httpDeleteNew(apiUrls: any, param: any = {}): Observable<any[]> {
    return this.http.delete<any[]>(`${this.apiUrlGDS}${apiUrls}`, { headers: this.headers, params: param });
  }
 

}


