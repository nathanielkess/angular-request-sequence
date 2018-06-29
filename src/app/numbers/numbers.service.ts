import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NumbersService {

  constructor(
    private http: HttpClient,
  ) {}

  getRandomNumber = (): Observable<any> => {
    return this.http.get('http://localhost:7900/posts');
  }

}
