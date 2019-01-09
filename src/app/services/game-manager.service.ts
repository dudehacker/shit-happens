import { Injectable } from '@angular/core';
import { cards } from '../models/cards.json' ;
import {Card} from '../models/card';
import {Player} from '../models/player';

@Injectable({
  providedIn: 'root',
})
export class GameManagerService {

  private deck: Card[] = [];
  private players: Player[] = [];
  private currPlayer: number;
  private roundCounter = 1;
  readonly MAX_PLAYERS = 4;
  readonly START_HAND_SIZE = 3;
  readonly END_HAND_SIZE = 7;


  constructor() {
    this.initialiseDeck();
    this.initialisePlayers();
  }

  getRound(){
    return this.roundCounter;
  }

  drawNewCard(){
    let card = this.deck.pop();
    card.visible = false;
    return card;
  }

  getCurrentPlayer(): Player{
    return this.players[this.currPlayer];
  }

  checkGameOver(){
    // console.log(this.getCurrentPlayer().hand.length);
    return (this.getCurrentPlayer().hand.length === this.END_HAND_SIZE);
  }

  endTurn(){
    if (this.checkGameOver()){
      //TODO end the game
      return;
    }
    // update current player index
    if (this.currPlayer < this.MAX_PLAYERS - 1){
      this.currPlayer++;
    } else {
      this.currPlayer=0;
      this.roundCounter++;
    }
  }

  initialiseDeck(){
    // populate the deck
    let _this = this;
    /*cards.forEach(function (card){
      _this.deck.push({situation: card.situation, score: card.score, visible: true});
    });*/

    for (let i = 0; i < 52; i ++){
      this.deck.push({situation: "asdasdasdsa", score: i+1, visible: true});
    }

    // shuffle the deck
    this.deck.sort(() => (Math.random() > .5) ? 1 : -1);
  }

  initialisePlayers(){
    for (let i = 0; i < this.MAX_PLAYERS; i ++){
      let hand = [];
      for (let j = 0; j < this.START_HAND_SIZE; j++){
        hand.push(this.deck.pop());
      }
      this.players.push({name: ""+(i+1),hand: hand});
    }
    this.currPlayer = 0;
  }

}
