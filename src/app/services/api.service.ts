import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  create(data: any) {
    return this.http
      .post<any>('http://localhost:3000/posts', data)
      .pipe(map((res: any) => res));
  }

  getOne(id: string) {
    return this.http
      .get<any>(`http://localhost:3000/posts/${id}`)
      .pipe(map((res: any) => res));
  }

  getMany() {
    return this.http
      .get<any>('http://localhost:3000/posts')
      .pipe(map((res: any) => res));
  }

  update(id: number, data: any) {
    return this.http
      .put<any>(`http://localhost:3000/posts/${id}`, data)
      .pipe(map((res: any) => res));
  }

  delete(id: string) {
    return this.http
      .delete<any>(`http://localhost:3000/posts/${id}`)
      .pipe(map((res: any) => res));
  }
}
