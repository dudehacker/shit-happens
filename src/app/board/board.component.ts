import { Component, OnInit } from '@angular/core';
import {Card} from '../models/Card';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {GameManagerService} from '../services/game-manager.service'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  deckList: Card[] = [];
  newCard: Card;
  hand : Card[];
  playerName: string;

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // console.log(this.hand);
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  constructor(private gm: GameManagerService){
    this.init();
  }

  init(){
    this.hand = this.gm.getCurrentPlayer().hand;
    this.playerName = this.gm.getCurrentPlayer().name;
    this.sortHand();
    this.newCard = this.gm.drawNewCard();
    this.deckList.push(this.newCard);
  }

  sortHand(): void{
    this.hand.sort(function (a, b){
      return a.score - b.score
    });
  }

  onClick(){
    if (this.deckList.length !== 0 ){
      return;
    }
    let valid = this.validateHand();
    console.log(valid);
    if (valid){
      this.newCard.visible = true;
      // TODO display alert for success
    } else {
      // remove the new card from hand
      let _this = this;
      let i = this.hand.findIndex(function (e){
        return e === _this.newCard;
      });
      this.hand.splice(i, 1);
      // TODO display alert for fail
    }
    this.gm.endTurn();
    this.init();
  }

  validateHand():boolean{
    let c = -1;
    for (let i = 0 ; i < this.hand.length; i++){
      if (this.hand[i].score < c){
        return false;
      } else {
        c = this.hand[i].score;
      }
    }
    return true;
  }

}
