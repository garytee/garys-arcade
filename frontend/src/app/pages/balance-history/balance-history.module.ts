import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceHistoryComponent } from './components/balance-history/balance-history.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

export const routes: Routes = [
  {path: '', component: BalanceHistoryComponent}
]


@NgModule({
  declarations: [
    BalanceHistoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
})
export class BalanceHistoryModule { }
