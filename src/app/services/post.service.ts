import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = environment.serverUrl + 'posts';
  constructor(private http: HttpClient) { }

  deletePost(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getPostList(page, size, search): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/?page=${page}&size=${size}&search=${search}`
    );
  }

  getPostDetails(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/get/${id}`);
  }

  viewPost(id, startDate: string = '', endDate: string = ''): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}?startDate=${startDate}&endDate=${endDate}`);
  }

  getComments(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/comments/${id}`);
  }
}
