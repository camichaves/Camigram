import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CargarPostsService {

  constructor( private httpClient: HttpClient) { }

  cargar( pagina: number) {
    const httpOptions = { headers: new HttpHeaders({
        // tslint:disable-next-line:max-line-length
        Authorization: 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU4NzIzNDMyMH0.ThO0D-dBGzdWwkwFhIutk_eaX-60qhsPmoO1EC40o9BETEPvfCuD3uGhpVMT77j8BvUworh4rrsg4kkRIZVwNw'
      })};
    return this.httpClient.get('http://localhost:8080/api/posts?page=' + pagina + '&size=3&sort=id%2Cdesc', httpOptions).pipe(
        catchError(err => {
          console.log('Errorrrrrrrrr');
          console.log(JSON.stringify(err));
          console.log(err.error.error_texto);
          return throwError(err.error.error_texto);
        })
    );
  }
}
