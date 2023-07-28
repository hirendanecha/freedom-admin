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
export class CommunityService {
  private baseUrl = environment.serverUrl + 'community';
  constructor(private http: HttpClient) {}

  getApproveCommunity(page: number, size: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/approve-community/?page=${page}&size=${size}`
    );
  }

  getUnApproveCommunity(page: number, size: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/un-approve-community/?page=${page}&size=${size}`
    );
  }

  changeCommunityStatus(id, status): Observable<any> {
    const communityId = id;
    const IsApprove = status;
    return this.http.get(
      `${this.baseUrl}/status/${communityId}?IsApprove=${IsApprove}`
    );
  }

  deleteCommunity(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getCommunityById(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  searchCommunity(searchText, page, size): Observable<any> {
    return this.http.get(
      `${
        this.baseUrl
      }/search/?searchText=${searchText.trim()}&?page=${page}&size=${size}`
    );
  }

  createCommunityAdmin(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create-community-admin`, data);
  }
}
