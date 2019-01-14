import { Component, Inject } from '@angular/core';
import {Card} from '../models/card';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {GameManagerService} from '../services/game-manager.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  deckList: Card[] = [];
  newCard: Card;
  hand : Card[];

  drop(event: CdkDragDrop<string[]>) {
    // console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.container.id === "cdk-drop-list-0" ){
        return;
      }
      // console.log(this.hand);
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    this.sortHand();
  }

  constructor(private gm: GameManagerService, public dialog: MatDialog, private router: Router ){
    console.log("board constructor");
    this.init();
  }

  init(){
    this.hand = this.gm.getCurrentPlayer().hand;
    this.sortHand();
    this.newCard = this.gm.drawNewCard();
    this.deckList.push(this.newCard);
  }

  sortHand(): void{
    this.hand.sort(function (a, b){
      if (!a.visible || !b.visible){
        return 0;
      }
      return a.score - b.score;
    });
  }

  onClick(){
    if (this.deckList.length !== 0 ){
      return;
    }
    let valid = this.validateHand();
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
    this.openDialog(valid);


  }

  openDialog(valid: boolean): void {
    let _this = this;
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        valid: valid,
        card: _this.newCard
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      let gameOver = _this.gm.endTurn(valid);
      if (gameOver){
        _this.router.navigate(['/result']);
      } else {
        _this.init();
      }
    });
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

export interface DialogData {
  valid: boolean;
  card: Card;
}


@Component({
  selector: 'app-dialog',
  templateUrl: '../dialog/dialog.component.html',
  styleUrls: ['../dialog/dialog.component.css']
})
export class DialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  displayMsg(): string{
    if (this.data.valid){
      return "Good guess"
    } else {
      return "Better luck next time"
    }
  }
}
