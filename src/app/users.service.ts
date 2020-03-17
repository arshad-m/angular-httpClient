import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";

export interface User{
  id: number,
  name: string,
  username: string,
  email: string,
  address: any,
  phone: string,
  website: string,
  company: any
}

export const configUrl = 'https://jsonplaceholder.typicode.com/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private httpClient : HttpClient
  ) { }

  getUsers(): Observable<User>{
    return this.httpClient.get<User>(configUrl)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse){
    console.log(error)
    if(error.error instanceof ErrorEvent){
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    }else{
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`error status code ${error.status}, `+
      `body was: ${error.error}`)
    }

    // return an observable with a user-facing error message
    return throwError('Something bad happened; Please try again');
  }
}
