import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IRole } from '../interfaces/IRole';

interface ApiResponse {
  status: number;
  data: IRole[] | null;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseURL = 'http://localhost:8080';
  private endpoint = 'roles';
  private apiUrl = `${this.baseURL}/${this.endpoint}`;

  constructor(private http: HttpClient) {}

  getRoles(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl)
      .pipe(
        map(response => {
          const rolesList: IRole[] = response.data ?? [];
          return { ...response, data: rolesList };
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<ApiResponse> {
    let errorMessage = 'Ocorreu um erro';
    if (error.status === 404) {
      errorMessage = 'Roles não encontradas';
    }
    return throwError({ status: error.status, data: null, message: errorMessage });
  }
}
