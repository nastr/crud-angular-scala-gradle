import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Product} from '../model/product.model';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ProductService {
  private readonly URL = 'http://localhost:3000/products';

  constructor(protected httpClient: HttpClient) {
  }

  public create(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.URL, product);
  }

  public delete(product: Product): Observable<Product> {
    return this.httpClient.delete<Product>(`${this.URL}/${product.id}`);
  }

  public get(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.URL}/${id}`)
      .pipe(catchError((res: HttpErrorResponse) => {
        alert(res.statusText);
        return throwError(res.message);
      }));
  }

  public list(): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(this.URL);
  }

  public update(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.URL}/${product.id}`, product);
  }
}
