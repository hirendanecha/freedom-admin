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
export class CommunityPostService {
  private baseUrl = environment.serverUrl + 'community-post';
  constructor(private http: HttpClient) {}

  getAllUserList(page: number, size: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/?page=${page}&size=${size}`);
  }

  getUserDetailsById(Id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${Id}`);
  }

  deleteUser(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  searchUser(searchText, page, size): Observable<any> {
    return this.http.get(
      `${
        this.baseUrl
      }/search/?searchText=${searchText.trim()}&?page=${page}&size=${size}`
    );
  }

  getPostList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }
}
