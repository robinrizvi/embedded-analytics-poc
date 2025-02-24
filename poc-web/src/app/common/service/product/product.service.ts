import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from './product';

@Injectable()
export class ProductService {
  private productsUrl: string;

  constructor(private http: HttpClient) { 
    this.productsUrl = 'http://localhost:8080/products';
  }

  public findAll(): Observable<Product[]> {
    return this.http.get<any>(this.productsUrl + '?size=99999').pipe(map(response => response._embedded.products));
  }

  public findAllByCategory(categories: string[]): Observable<Product[]> {
    return this.http.get<any>(this.productsUrl + "/search/category?q=" + categories.toString() + "&size=99999").pipe(map(response => response._embedded.products));
  }
}
