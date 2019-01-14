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

  readonly winner: string;

  constructor(private gm : GameManagerService, private router: Router) {
    this.winner = this.getWinner();
  }

  getWinner():string {
    let players = this.gm.getStats();
    let output = players[0].name;
    let maxScore = players[0].score;
    for (let i = 1; i < players.length; i++ ){
      if (players[i].score === maxScore){
        output += ", " + players[i].name;
      } else {
        break;
      }
    }

    return output;
  }

  newGame(){
    this.gm.newGame();
    this.router.navigate(['/game']);
  }
}
