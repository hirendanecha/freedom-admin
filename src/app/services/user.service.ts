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
export class UserService {
  private baseUrl = environment.serverUrl + 'customers';
  constructor(private http: HttpClient) {}

  login(login: any): Observable<Object> {
    return this.http.post(`${this.baseUrl}/login`, {
      email: login.Email,
      password: login.Password,
    });
  }

  getAllUserList(page: number, size: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/?page=${page}&size=${size}`);
  }

  getUserDetailsById(Id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${Id}`);
  }

  changeUserStatus(id, status): Observable<any> {
    const userId = id;
    const IsActive = status;
    return this.http.get(
      `${this.baseUrl}/change-status/${userId}?IsActive=${IsActive}`
    );
  }

  changeAccountType(id, status): Observable<any> {
    const userId = id;
    const type = status;
    return this.http.get(
      `${this.baseUrl}/change-user-type/${userId}?type=${type}`
    );
  }

  suspendUser(id, status): Observable<any> {
    const userId = id;
    const IsSuspended = status;
    return this.http.get(
      `${this.baseUrl}/suspend-user/${userId}?IsSuspended=${IsSuspended}`
    );
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

  getUserList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get`);
  }
}
