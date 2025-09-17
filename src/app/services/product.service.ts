import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../models/Product.model';
import { IProduct, IProductNoID } from '../interfaces/IProduct';
import { APIRoutes } from '../utils/APIRoutes';
import { ApiResponseDTO } from '../utils/ApiResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURL = 'http://localhost:8080/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ApiResponseDTO> {
    return this.http.get<ApiResponseDTO>(this.apiURL)
      .pipe(
        map(response => {
          const productList: Product[] = response.data ?? [];
          return response;
        }),
        catchError(this.handleError)
      );
  }

  getById(id: number): Observable<ApiResponseDTO> {
    return this.http.get<ApiResponseDTO>(this.apiURL + '/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  create(product: Product): Observable<ApiResponseDTO> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const createProductDTO: IProductNoID = {
      name: product.name,
      price: product.price,
      sku: product.sku,
      barcode: product.barcode,
      stockQuantity: product.stockQuantity,
      categoryId: product.categoryId
    }

    return this.http.post<ApiResponseDTO>(APIRoutes.PRODUCTS, createProductDTO, { headers }).pipe(
      map(response => {
        console.log("Send Req. to Create a Product");

        this.checkResponseStatus(response);
        return response;
      }),
      catchError(this.handleError) // Lida com erros da requisição.
    );
  }

  update(product: Product): Observable<ApiResponseDTO> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const updateProductDTO = {
      name: product.name,
      price: product.price,
      sku: product.sku,
      barcode: product.barcode,
      stockQuantity: product.stockQuantity,
      categoryId: product.categoryId
    }

    return this.http.patch<ApiResponseDTO>(APIRoutes.PRODUCTS + "/" + product.id, updateProductDTO, { headers }).pipe(
      map(response => {
        this.checkResponseStatus(response);
        return response;
      }),
      catchError(this.handleError) // Lida com erros da requisição.
    );
  }

  remove(id: number): Observable<ApiResponseDTO> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.delete<ApiResponseDTO>(`${APIRoutes.PRODUCTS}/${id}`, { headers }).pipe(
      map(response => {
        console.log("Delete Product");

        this.checkResponseStatus(response);

        console.log("res => " + JSON.stringify(response.data))

        if (Array.isArray(response.data)) {
          // Caso data seja uma lista de produtos
          response.data.forEach(prod => {
            console.log("Produto da lista:", prod.id, prod.name);
          });
        } else if (response.data !== null) {
          // Caso data seja um único produto (objeto)
          //console.log("Produto único:", response.data.id, response.data.name);
        } else {
          console.warn("response.data está nulo");
        }
        return response;
      }),
      catchError(this.handleError) // Lida com erros da requisição.
    );
  }

  search(parameterValue:string): Observable<ApiResponseDTO> {
    let parameterName:string = "?name=";

    return this.http.get<ApiResponseDTO>(APIRoutes.PRODUCTS_SEARCH + parameterName + parameterValue)
      .pipe(
        map(response => {
          console.log("Search by product...")
          const productList: Product[] = response.data ?? [];
          return response;
        }),
        catchError(this.handleError)
      );
  }

  // Tratar o Erro
  private handleError(ex: HttpErrorResponse): Observable<ApiResponseDTO> {
    
    let errorMessage: string | null = null;
    errorMessage = ex.error.message;

    
    console.error("Erro HTTP: ", errorMessage)

    return throwError({ status: ex.status, data: null, message: errorMessage });
  }

  // Verificar o status da resposta
  checkResponseStatus(response: ApiResponseDTO): void {
    
    if (response.status !== 200 && response.status !== 201) {
      const errorMessage = `Erro ao criar usuário. Status inesperado: ${response.status}`;
      throwError({ status: response.status, data: null, message: errorMessage });
    }

  }
}
