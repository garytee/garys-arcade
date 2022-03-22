import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/core/ui-service/ui.service';
import { BalanceHistory, UiModel } from 'src/app/models';
import { Games } from '../../../models/games';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.scss'],
})
export class GameRoomComponent implements OnInit, OnDestroy {
  games: Games[] = [];

  transactions: BalanceHistory[] = [];
  balanceValue: number = 0;
  errorMessage: string = '';

  currentBalance$: Subscription = new Subscription();
  uiModel$: Subscription = new Subscription();

  constructor(private uiService: UiService) {}

  ngOnInit(): void {
    this.currentBalance$ = this.uiService.currentBalance$.subscribe(
      (data: number) => {
        this.balanceValue = data;
      }
    );

    this.uiModel$ = this.uiService.uiModel$.subscribe((data: UiModel) => {
      this.transactions = data.transactions;
      this.games = data.games;
      this.uiService.calcBalance(this.transactions);
    });
  }

  ngOnDestroy(): void {
    this.currentBalance$.unsubscribe();
  }

  getNewId() {
    return (
      this.transactions.map((obj) => obj.id).sort((a, b) => a - b)[
        this.transactions.length - 1
      ] + 1
    );
  }

  onClick(type: string, index: number) {

    const game = this.games[index]
    
    const {name, tokens} = game

    if (type === 'spend' && this.balanceValue < tokens) {
      this.errorMessage = "You don't have enough tokens, please purchase more.";
      return;
    }

    /** Reset Error Message if user has enough tokens for another game */
    this.errorMessage = '';

    this.transactions.push({
      id: this.getNewId(),
      type: type,
      tokens: tokens,
      description: `Played ${name}`,
      date: new Date(),
    });

    this.uiService.calcBalance(this.transactions);
  }
}
