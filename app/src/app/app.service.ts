import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
    message: string;

  constructor(
    private http: HttpClient
  ) { }

  getHelloMessageFromApi() {
    return this.http.get('/api', { responseType: 'text' });
  }

}
