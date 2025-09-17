import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Category } from '../models/Category.model';
import { APIRoutes } from '../utils/APIRoutes';

interface ApiResponse {
  status: number;
  data: any[] | null;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(APIRoutes.CATEGORY)
      .pipe(
        map(response => {
          const categoryList: Category[] = response.data ?? [];
          return response;
        }),
        catchError(this.handleError)
      );
  }


  // Tratar o Erro
  private handleError(error: HttpErrorResponse): Observable<ApiResponse> {
    
    let errorMessage: string | null = null;

    console.error("Erro HTTP: ", error)

    if (error.status === 409) {
      errorMessage = 'Produto já está desativado';
    } else if(error.status == 404) {
      errorMessage = 'Produto não encontrado';
    } else {
      errorMessage = "Ocorreu um erro";
    }

    return throwError({ status: error.status, data: null, message: errorMessage });
  }

  // Verificar o status da resposta
  checkResponseStatus(response: ApiResponse): void {
    
    if (response.status !== 200 && response.status !== 201) {
      const errorMessage = `Erro ao criar usuário. Status inesperado: ${response.status}`;
      throwError({ status: response.status, data: null, message: errorMessage });
    }

  }
}
