import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AutenticarService {

  constructor( private httpClient: HttpClient) { }

  iniciar() {
      let user = new User('user', 'user');
      return this.httpClient.post('http://3.19.167.71:8080/api/authenticate', user ).pipe(
        catchError(err => {
          console.log('Errorrrrrrrrr');
          console.log(JSON.stringify(err));
          console.log(err.error.error_texto);
          return throwError(err.error.error_texto);
        })
    );
  }
    }
export class User {
    private username;
    private password;
    constructor(name: string, pass: string) {
        this.username = name;
        this.password = pass;
    }
}

