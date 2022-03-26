import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UiModel, BalanceHistory, Games, Balance } from 'src/app/models';
import { HttpService } from '../http-service/http.service';

@Injectable()
export class UiService {
  /** when updated all other components subscribed to it will update too */
  private initUiModel: UiModel = {
    transactions: [],
    games: [],
    balance: {} as Balance,
  };
  private uiModel = new BehaviorSubject(this.initUiModel);
  uiModel$ = this.uiModel.asObservable();

  constructor(private http: HttpService) {}

  public getBalanceHistory() {
    this.http.getBalanceHistory().subscribe(
      (data: BalanceHistory[]) => {
        this.uiModel.next({ ...this.uiModel.value, transactions: data });
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  public getBalance() {
    this.http.getBalance().subscribe(
      (data: Balance) => {
        this.uiModel.next({ ...this.uiModel.value, balance: data });
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  public getGames() {
    this.http.getGames().subscribe(
      (data: Games[]) => {
        this.uiModel.next({ ...this.uiModel.value, games: data });
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
