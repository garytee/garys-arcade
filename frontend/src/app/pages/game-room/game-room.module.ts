import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GameRoomComponent } from './components/game-room.component';

export const routes: Routes = [
  {path: '', component: GameRoomComponent}
]

@NgModule({
  declarations: [GameRoomComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ]
})
export class GameRoomModule { }
