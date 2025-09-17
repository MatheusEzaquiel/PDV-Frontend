import { Injectable } from '@angular/core'; 
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserRole } from '../models/UserRole.model';
import { User } from '../models/User.model';
import { ICreateUserDTO } from '../interfaces/IUser';
import { APIRoutes } from '../utils/APIRoutes';

interface ApiResponse {
  status: number;
  data: any[] | null;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private baseURL = 'http://localhost:8080';
  private endpoint = 'users';
  private fullURL = `${this.baseURL}/${this.endpoint}`;

  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl)
    .pipe(
      map(response => {
        const userList: UserRole[] = response.data ?? [];
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getUsersWithRole(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(APIRoutes.USER_ROLE)
    .pipe(
      map(response => {
        const userList: UserRole[] = response.data ?? [];
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.fullURL + '/' + id)
    .pipe(
      catchError(this.handleError)
    );
  }

  createUser(nameUser: string, emailUser: string, roleIdUser: number): Observable<ApiResponse> {

    console.log("enviadoS")
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    const createUserDTO: ICreateUserDTO = {
      name: nameUser,
      email: emailUser,
      roleId: roleIdUser
    }
  
    return this.http.post<ApiResponse>(this.apiUrl, createUserDTO, { headers }).pipe(
      map(response => {
        
        console.log("enviado requisição")
        this.checkResponseStatus(response);
        // Retornar os dados da resposta
        return response; // Aqui, você pode retornar a resposta inteira se precisar do status, data, e message
      }),
      catchError(this.handleError) // Lida com erros da requisição.
    );
  }

  updateUser(id: number, name: string, email: string, roleId: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { name, email, roleId };
    
    return this.http.patch(`${this.apiUrl}/${id}`, body, { headers });
  }

  deleteUser(userId: number): Observable<ApiResponse> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${userId}`).pipe(
      map(response => ({ status: 200, data: null, message: response.message || 'Usuário removido com sucesso' })),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<ApiResponse> {
    let errorMessage = 'Ocorreu um erro';
    if (error.status === 409) {
      errorMessage = 'Usuário já está desativado';
    }
    return throwError({ status: error.status, data: null, message: errorMessage });
  }

  // Novo método para verificar o status da resposta
  checkResponseStatus(response: ApiResponse): void {
    if (response.status !== 200 && response.status !== 201) {
      const errorMessage = `Erro ao criar usuário. Status inesperado: ${response.status}`;
      throwError({ status: response.status, data: null, message: errorMessage });
    }
  }
}
