import {HttpClient} from '@angular/common/http';
import {Product} from '../model/product.model';
import {Observable} from 'rxjs';
import {Injectable, OnInit} from '@angular/core';

@Injectable()
export class ProductService implements OnInit {
    private readonly URL = 'http://localhost:3000/products';

    private products: Array<Product> | null;

    constructor(protected httpClient: HttpClient) {
    }

    public create(product: Product): Observable<Product> {
        if (this.products) {
            let i: number = this.products.map(p => p.id).reduce((prev, current) => (prev > current) ? prev : current);
            product.id = i + 1;
            this.products.push(product);
        }
        return this.httpClient.post<Product>(this.URL, product);
    }

    public delete(product: Product): Observable<Product> {
        if (this.products)
            this.products = this.products.filter(obj => obj !== product);
        return this.httpClient.delete<Product>(`${this.URL}/${product.id}`);
    }

    public get(id: number): Observable<Product> {
        return Observable.create(observer => {
            if (this.products) {
                let p: Product = this.products.find(d => d.id === id);
                if (p) {
                    observer.next(p);
                    observer.complete();
                } else {
                    this.httpClient.get<Product>(`${this.URL}/${id}`).subscribe((p: Product) => {
                        this.products.push(p);
                        observer.next(p);
                        observer.complete();
                    });
                }
            }
        });
    }

    public list(): Observable<Array<Product>> {
        return Observable.create(observer => {
            if (this.products) {
                observer.next(this.products.slice());
                observer.complete();
            } else
                this.httpClient.get<Array<Product>>(this.URL).subscribe((p: Product[]) => {
                    this.products = p;
                    observer.next(this.products.slice());
                    observer.complete();
                });
        });
    }

    public update(product: Product): Observable<Product> {
        if (this.products) {
            let i: number = this.products.findIndex(p => p.id === product.id);
            this.products[i] = product;
        }
        return this.httpClient.put<Product>(`${this.URL}/${product.id}`, product);
    }

    ngOnInit() {
        if (!this.products) {
            this.list().subscribe();
        }
    }
}
