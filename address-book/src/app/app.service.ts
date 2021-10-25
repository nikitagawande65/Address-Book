import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { List } from './data.model';
@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(private http: HttpClient) {}

  getData(): Observable<List[]> {
    let url = 'assets/data.json';
    return this.http.get<List[]>(url);
  }
}
