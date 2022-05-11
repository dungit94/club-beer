import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  fetchGetAll(url:any) {
    return this.http.get(url);
  }

  fetchPost(url: any, data:any) {
    return this.http.post<any>(url, data)
    .pipe(map((res:any) => {
      return res;
    }));
  }
}
