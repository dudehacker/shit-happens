import { Component } from '@angular/core';
import {GameManagerService} from '../services/game-manager.service'
import {Player} from '../models/player';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {

  readonly winner: Player;

  constructor(private gm : GameManagerService, private router: Router) {
    this.winner = this.getWinner();
  }

  getWinner():Player{
    return this.gm.getStats()[0];
  }

  newGame(){
    this.gm.newGame();
    this.router.navigate(['/game']);
  }
}
