import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AgeData {
  age: number;
  yearsLeft: number;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getData(): Observable<AgeData[]> {
    return this.http.get<AgeData[]>('./assets/data.json');
  }
}
