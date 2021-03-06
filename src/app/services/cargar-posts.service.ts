import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CargarPostsService {

  constructor( private httpClient: HttpClient) { }

  cargar( pagina: number) {
    const httpOptions = { headers: new HttpHeaders({
        // tslint:disable-next-line:max-line-length
        Authorization: 'Bearer ' + environment.token})};
    return this.httpClient.get('http://3.19.167.71:8080/api/posts?page=' + pagina + '&size=3&sort=id%2Cdesc', httpOptions).pipe(
        catchError(err => {
          console.log('Errorrrrrrrrr');
          console.log(JSON.stringify(err));
          console.log(err.error.error_texto);
          return throwError(err.error.error_texto);
        })
    );
  }
}
