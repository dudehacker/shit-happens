import { Injectable } from '@angular/core';
import { cards as demoDeck } from '../models/cards.json' ;
import { cards as deck1} from '../models/deck1.json' ;
import { cards as deck2} from '../models/deck2.json' ;
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
  private gameCounter = 0;
  private MAX_PLAYERS;
  readonly START_HAND_SIZE = 3;
  public END_HAND_SIZE = 7;
  public MAX_CARDS;


  constructor() {}

  init(n: number){
    if (n !== 1){
      this.gameCounter++;
    }
    this.MAX_PLAYERS = n;
    this.deck = [];
    this.players = [];
    this.currPlayer = 0;
    this.roundCounter = 1;
    this.END_HAND_SIZE = 7;
    this.initialiseDeck();
    this.initialisePlayers();
  }

  initialiseDeck(){
    let _this = this;
    console.log("loading deck " + _this.gameCounter);
    // populate the deck

    let temp = null;
    if (_this.gameCounter === 0){
      temp = demoDeck;
      _this.END_HAND_SIZE = 5;
    }
    else if (_this.gameCounter % 2 === 1){
      temp = deck1;
    } else {
      temp = deck2;
    }

    temp.forEach(function (card){
      _this.deck.push({situation: card.situation, score: card.score, visible: true});
    });

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
    let timeOut = (this.deck.length === 0);
    return ((this.getCurrentPlayer().score === this.END_HAND_SIZE) || timeOut);
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
