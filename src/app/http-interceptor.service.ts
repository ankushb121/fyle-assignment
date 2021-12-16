import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private toastr: ToastrService, private httpService:HttpService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.httpService.changeApiStatus(true);
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      
      if (event instanceof HttpResponse) {
        this.httpService.changeApiStatus(false);
        return event.body;
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        this.httpService.changeApiStatus(false);
        if (err.status) {
          
          
        }  
      }
    }));
  }
}
