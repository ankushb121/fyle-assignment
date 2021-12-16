import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable,throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';


const BASE_URL="https://api.github.com/";
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private bSubject = new BehaviorSubject(false); 
  isApiLoading = this.bSubject.asObservable();

  constructor(private http: HttpClient) {}

  changeApiStatus(isLoading:boolean){
    this.bSubject.next(isLoading);
  }
  
  getWithHeader(endpoint: string): Observable<any> {
    const httpOptions: Object = {
      headers: new HttpHeaders({
        Accept: 'application/vnd.github.v3+json',
      })
    };
    let url= BASE_URL+endpoint;
    return this.http.get(url, httpOptions).pipe(
      tap(data => console.log('server data:', data)), 
      catchError(err=> {return throwError(err)})
  );
  }
}
