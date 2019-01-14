import { Component, OnInit } from '@angular/core';
import {GameManagerService} from '../services/game-manager.service'

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(gm : GameManagerService) { }

  ngOnInit() {
  }

}
