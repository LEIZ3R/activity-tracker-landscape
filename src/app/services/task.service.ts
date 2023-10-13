import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Activity } from '../models/activitie';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getActivities(): Observable<Activity[]> {
    const url: string = 'http://localhost:3000/activitys';
    return this.http.get<Activity[]>(url).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMsg = '';
    if (error.error instanceof ErrorEvent) {
      errorMsg = error.error.message;
    } else {
      errorMsg = `Error code: ${error.status}. Message: ${error.message}`;
    }
    return throwError(() => new Error(errorMsg));
  }
}
