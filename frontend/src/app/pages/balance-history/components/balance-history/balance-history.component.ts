import { Component, OnDestroy, OnInit } from '@angular/core';
import { BalanceHistory } from '../../../../models/balance-history';
import { UiService } from 'src/app/core/ui-service/ui.service';
import { Subscription } from 'rxjs';
import { UiModel } from 'src/app/models';

@Component({
  selector: 'app-balance-history',
  templateUrl: './balance-history.component.html',
  styleUrls: ['./balance-history.component.scss'],
})
export class BalanceHistoryComponent implements OnInit, OnDestroy {

  transactions: BalanceHistory[] = [];
  balanceValue: number = 0;
  errorMessage: string = '';
  tokens: number = 0;

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
      this.uiService.calcBalance(this.transactions);
    });
  }

  ngOnDestroy(): void {
    this.currentBalance$.unsubscribe();
  }

  getNewId() {
    return (
      this.transactions.map((obj) => obj.id).sort((a, b) => a-b)[
        this.transactions.length - 1
      ] + 1
    );
  }

  onClick(type: string) {

    if (!this.tokens) {
      this.errorMessage = 'Error: Please enter an amount';
      return;
    }

    if (this.tokens <= 0) {
      this.errorMessage = "Error: you can't purchase negative tokens";
      return;
    }

    this.errorMessage = '';

    this.transactions.push({
      id: this.getNewId(),
      type: type,
      tokens: this.tokens,
      description: `${this.tokens} Tokens Purchased`,
      date: new Date(),
    });

    /** Reset tokens form to 0 */
    this.tokens = 0;

    this.uiService.calcBalance(this.transactions);
  }

}
