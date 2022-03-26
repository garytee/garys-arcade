import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { BalanceHistoryModule } from './pages/balance-history/balance-history.module';
import { CoreModule } from './core/core.module';
import { GameRoomModule } from './pages/game-room/game-room.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    HttpClientModule, 
    BalanceHistoryModule,
    CoreModule,
    GameRoomModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
