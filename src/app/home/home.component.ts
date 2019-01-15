import { Component, OnInit } from '@angular/core';
import {GameManagerService} from '../services/game-manager.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private gm: GameManagerService, private router: Router) { }

  onClick(playerCount: number):void{
    this.gm.init(playerCount);
    this.router.navigate(['/game']);
  }

}
