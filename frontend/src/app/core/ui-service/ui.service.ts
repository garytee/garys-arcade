import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UiModel } from 'src/app/models';
import { BalanceHistory } from 'src/app/models';
import { Games } from 'src/app/models';
import { HttpService } from '../http-service/http.service';

@Injectable()
export class UiService {
  /** when updated all other components subscribed to it will update too */
  private currentBalance = new BehaviorSubject(0);
  currentBalance$ = this.currentBalance.asObservable();

  private initUiModel: UiModel = {
    transactions: [],
    games: [],
  };
  private uiModel = new BehaviorSubject(this.initUiModel);
  uiModel$ = this.uiModel.asObservable();

  constructor(private http: HttpService) {}

  public changeBalance(balance: number) {
    return this.currentBalance.next(balance);
  }

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

  public calcBalance(transactions: BalanceHistory[]) {
    let b = 0;
    transactions.forEach((transaction) => {
      transaction.type === 'purchase'
        ? (b += transaction.tokens)
        : (b -= transaction.tokens);
    });
    this.changeBalance(b);
  }
}
