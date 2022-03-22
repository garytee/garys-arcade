import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }
  
  public getBalanceHistory(): any {
    return this.http.get(`${this.baseUrl}/transactions`).pipe((res: any) => res || {});
  }

  public getGames(): any {
    return this.http.get(`${this.baseUrl}/games`).pipe((res: any) => res || {});
  }
}
