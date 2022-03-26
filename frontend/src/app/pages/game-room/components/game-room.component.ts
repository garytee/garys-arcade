import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/core/ui-service/ui.service';
import { BalanceHistory, UiModel, Games } from 'src/app/models';
import { HttpService } from 'src/app/core/http-service/http.service';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.scss'],
})
export class GameRoomComponent implements OnInit, OnDestroy {
  games: Games[] = [];
  transactions: BalanceHistory[] = [];
  errorMessage: string = '';
  newBalance: number = 0;
  uiModel$: Subscription = new Subscription();

  constructor(private uiService: UiService, private httpService: HttpService) {}

  ngOnInit(): void {
    this.uiModel$ = this.uiService.uiModel$.subscribe((data: UiModel) => {
      this.transactions = data.transactions;
      this.games = data.games;
      this.newBalance = data.balance.balance;
    });
  }

  ngOnDestroy(): void {
    this.uiModel$.unsubscribe();
  }

  onClick(type: string, index: number) {
    const game = this.games[index];
    const { name, tokens } = game;

    if (type === 'spend' && this.newBalance < tokens) {
      this.errorMessage = "You don't have enough tokens, please purchase more.";
      return;
    }

    /** Reset Error Message if user has enough tokens for another game */
    this.errorMessage = '';

    const data = {
      type: type,
      description: `Played ${name}`,
      tokens: tokens,
    };

    this.httpService.postTransaction(data).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (e: any) => {
        console.log(e);
      },
      complete: () => {
        this.uiService.getBalanceHistory();
        this.uiService.getBalance();
      },
    });
  }
}
