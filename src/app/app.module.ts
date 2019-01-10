import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import {GameManagerService} from './services/game-manager.service'
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    LeaderboardComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    MatButtonModule,
    MatBadgeModule,
    AppRoutingModule
  ],
  providers: [GameManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
