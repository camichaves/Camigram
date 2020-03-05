import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CargarPostsService {

  constructor( private httpClient: HttpClient) { }

  cargar() {
    const httpOptions = { headers: new HttpHeaders({
        // tslint:disable-next-line:max-line-length
        Authorization: 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU4MzUwMTg5Mn0.gRewk-PHI7nUZ5pQEMNBP6lp5JIkR3wX6MiiJNkEVpCMQyISPzETq-JfwCGCWj1giWbgDKusz65SwT6IzEPZJQ'
      })};
    return this.httpClient.get('http://localhost:8080/api/posts', httpOptions).pipe(
        catchError(err => {
          console.log('Errorrrrrrrrr');
          console.log(JSON.stringify(err));
          console.log(err.error.error_texto);
          return throwError(err.error.error_texto);
        })
    );
  }
}
