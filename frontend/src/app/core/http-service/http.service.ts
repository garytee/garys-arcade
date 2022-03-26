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
    return this.http
      .get(`${this.baseUrl}/transactions`)
      .pipe((res: any) => res || {});
  }

  public getBalance(): any {
    return this.http
      .get(`${this.baseUrl}/transactions/calcbalance`)
      .pipe((res: any) => res || {});
  }

  public getGames(): any {
    return this.http.get(`${this.baseUrl}/games`).pipe((res: any) => res || {});
  }

  public postTransaction(data: any) {
    return this.http
      .post(`${this.baseUrl}/transactions`, data)
      .pipe((res: any) => res || {});
  }
}
