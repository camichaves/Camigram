import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})


export class SubirPostService {
  constructor( private httpClient: HttpClient) { }

  cargar(tit: string, img: string) {
    const post = new Post(tit, img);
    const httpOptions = { headers: new HttpHeaders({
        // tslint:disable-next-line:max-line-length
        Authorization: 'Bearer ' + environment.token })};
    return this.httpClient.post('http://3.19.167.71:8080/api/posts', post, httpOptions).pipe(
        catchError(err => {
          console.log('Errorrrrrrrrr');
          console.log(JSON.stringify(err));
          console.log(err.error.error_texto);
          return throwError(err.error.error_texto);
        })
    );
  }
}
class Post {
    private img;
    private imgContentType;
    private titulo;
    constructor(tit: string, img: string) {
        this.img = img;
        this.titulo = tit;
        this.imgContentType = 'image/jpeg';
    }
}
