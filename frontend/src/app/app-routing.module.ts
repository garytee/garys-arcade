import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

/** lazyload pages: add components to a module then export the page as a module */
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },

  {
    path: 'gameroom',
    loadChildren: () =>
      import('./pages/game-room/game-room.module').then(
        (m) => m.GameRoomModule
      ),
  },

  {
    path: 'balancehistory',
    loadChildren: () =>
      import('./pages/balance-history/balance-history.module').then(
        (m) => m.BalanceHistoryModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
