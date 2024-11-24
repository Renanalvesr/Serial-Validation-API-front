import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TrackingValidatorService {
  private apiUrl = 'http://localhost:8080/serials';

  constructor(private http: HttpClient) {}

  getProductByTracking(trackingNumber: string): Observable<any> {
    const url = `${this.apiUrl}/trackingNumber=${trackingNumber}`;

    return this.http.get<any>(url).pipe(
      catchError((error) => {
        const errorMessage = error?.error?.errorMessage || 'Product fetch error'; 

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
