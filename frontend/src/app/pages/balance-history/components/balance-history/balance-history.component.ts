import { Component, OnDestroy, OnInit } from '@angular/core';
import { UiService } from 'src/app/core/ui-service/ui.service';
import { Subscription } from 'rxjs';
import { UiModel, BalanceHistory } from 'src/app/models';
import { HttpService } from 'src/app/core/http-service/http.service';
@Component({
  selector: 'app-balance-history',
  templateUrl: './balance-history.component.html',
  styleUrls: ['./balance-history.component.scss'],
})

export class BalanceHistoryComponent implements OnInit, OnDestroy {
  transactions: BalanceHistory[] = [];
  errorMessage: string = '';
  tokens: number = 0;
  uiModel$: Subscription = new Subscription();

  constructor(
    private uiService: UiService,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.uiModel$ = this.uiService.uiModel$.subscribe((data: UiModel) => {
      this.transactions = data.transactions;
    });
  }

  ngOnDestroy(): void {
    this.uiModel$.unsubscribe();
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

    const data = {
      type: type,
      description: `${this.tokens} Tokens Purchased`,
      tokens: this.tokens,
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

    /** Reset tokens form to 0 */
    this.tokens = 0;

  }
}
