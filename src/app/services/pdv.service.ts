import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ISaleWithSaleItem } from "../interfaces/ISale";
import { APIRoutes } from "../utils/APIRoutes";
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiResponseDTO } from '../utils/ApiResponseDTO';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PDVService {

    currentSale: [] = [];
    headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient) { }

    // Criar Pedido
    async addSaleItem(product: any) {

    };

    createCompleteSale(sale: ISaleWithSaleItem) {

        return this.http.post<ApiResponseDTO>(APIRoutes.SALE_COMPLETE, sale, {headers: this.headers}).pipe(
            map(res => {
                return res;
            }),
            catchError(this.handleError) // Lida com erros da requisição.
        );
    };

    // Armazenar Items no pedido

    // Exibir Itens no pedido

    // Remove Iwtems do pedido

    private handleError(ex: HttpErrorResponse): Observable<ApiResponseDTO> {
    const errorMessage: string = ex.error?.message ?? ex.message ?? 'Erro desconhecido';

    console.error("Erro HTTP:", {
        status: ex.status,
        message: errorMessage,
        error: ex.error
    });

    // Retorna o erro padronizado
    return throwError({ 
        status: ex.status, 
        data: null, 
        message: errorMessage 
    });
}

}