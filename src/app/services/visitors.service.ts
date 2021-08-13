import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VisitorsService {
  constructor(private http: HttpClient) {}

  getIpAddress(): any {
    return this.http
      .get('https://api.ipify.org/?format=json')
      .pipe(catchError(this.handleError));
  }

  getGEOLocation(ip: any): any {
    const url =
      'https://geo.ipify.org/api/v1?apiKey=at_7HteoFbDN1yZXCHt3PaZvOozsI8v4&domain=' +
      ip;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
