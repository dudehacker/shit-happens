import { Component, OnInit } from '@angular/core';
import {GameManagerService} from '../services/game-manager.service'
@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
    playerName: string;
    displayedColumns: string[] = ['name', 'score'];

  constructor(public gm: GameManagerService) {

  }

  ngOnInit() {

  }

}
