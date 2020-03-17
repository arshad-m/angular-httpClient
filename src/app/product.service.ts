import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";

export interface Product {
  id:number,
  name: string,
  description: string,
  price: number,
  imageUrl: string,
  quantity: number
}

export const postUrl = 'http://localhost:3000/products';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type':  'application/json; charset=UTF-8',
    // 'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})


export class ProductService {

  constructor(
    private httpClient : HttpClient
  ) { 
    httpOptions.headers.set('Authorization', 'my-new-auth-token');
  }

  get(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(postUrl)
    .pipe(
      // map(response => response),
      catchError(this.handleError)
    );
  }

  post(post:Product) : Observable<Object>{
    return this.httpClient.post(postUrl, post, httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  delete(id:number){
    return this.httpClient.delete(`${postUrl}/${id}`)
    .pipe(
      catchError(this.handleError)
    )
  }

  put(post:Product, id:number){
    return this.httpClient.put(`${postUrl}/${id}`, post, httpOptions)
    .pipe(
      catchError(()=> throwError("Cant update the Product"))
    )
  }

  private handleError(error: HttpErrorResponse){
    console.log(error);
    return throwError ('Something bad happened, Please try again')
  }
}
