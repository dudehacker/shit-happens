import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent, DialogComponent } from './board/board.component';
import {GameManagerService} from './services/game-manager.service'
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    DialogComponent,
    LeaderboardComponent,
    HomeComponent,
    ResultComponent
  ],
  entryComponents:[
    DialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatDialogModule,
    AppRoutingModule
  ],
  providers: [GameManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
