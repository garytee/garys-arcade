import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from './../../core/ui-service/ui.service';
import { BalanceHistory, UiModel } from 'src/app/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  transactions: BalanceHistory[] = [];
  newBalance: number = 0;
  uiModel$: Subscription = new Subscription(); 

  constructor(private uiService: UiService) {}

  ngOnInit(): void {
    this.uiModel$ = this.uiService.uiModel$.subscribe((data: UiModel) => {
      this.transactions = data.transactions;
      this.newBalance = data.balance.balance;
    });
  }

  ngOnDestroy(): void {
    this.uiModel$.unsubscribe();
  }

}
