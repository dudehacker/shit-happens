import { Injectable } from '@angular/core';
import { cards } from '../models/cards.json' ;
import {Card} from '../models/card';
import {Player} from '../models/player';

@Injectable({
  providedIn: 'root',
})
export class GameManagerService {

  private deck: Card[];
  private players: Player[];
  private currPlayer: number;
  private roundCounter;
  private gameCounter = 1;
  readonly MAX_PLAYERS = 4;
  readonly START_HAND_SIZE = 3;
  readonly END_HAND_SIZE = 4;
  public MAX_CARDS;


  constructor() {
    this.init();
  }

  init(){
    this.deck = [];
    this.players = [];
    this.currPlayer = 0;
    this.roundCounter = 1;
    this.initialiseDeck();
    this.initialisePlayers();
  }

  initialiseDeck(){
    // populate the deck
    let _this = this;
    /*cards.forEach(function (card){
      _this.deck.push({situation: card.situation, score: card.score, visible: true});
    });*/
    console.log("loading deck " + _this.gameCounter);
    for (let i = 0; i < 52; i ++){
      _this.deck.push({situation: "asdasdasdsa", score: i+1, visible: true});
    }
    _this.MAX_CARDS = _this.deck.length;

    // shuffle the deck
    _this.deck.sort(() => (Math.random() > .5) ? 1 : -1);
  }

  initialisePlayers(){
    for (let i = 0; i < this.MAX_PLAYERS; i ++){
      let hand = [];
      for (let j = 0; j < this.START_HAND_SIZE; j++){
        hand.push(this.deck.pop());
      }
      this.players.push({name: "Team "+(i+1),hand: hand, score: hand.length});
    }
  }

  getStats(): Player[]{
    // console.log("getStats() called");
    let sorted = this.players.slice(0);
    sorted.sort(function (a,b) {
      return b.score - a.score
    });
    return sorted;
  }

  getRound(){
    return this.roundCounter;
  }

  getPlayers(){
    return this.players;
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
    return (this.getCurrentPlayer().score === this.END_HAND_SIZE);
  }

  newGame(){
    this.gameCounter++;
    this.init();
  }

  endTurn(valid: boolean):boolean{
    if (valid){
      this.getCurrentPlayer().score++;
    }
    if (this.checkGameOver()){
      return true;
    }
    // update current player index
    if (this.currPlayer < this.MAX_PLAYERS - 1){
      this.currPlayer++;
    } else {
      this.currPlayer=0;
      this.roundCounter++;
    }
    return false;
  }

}
