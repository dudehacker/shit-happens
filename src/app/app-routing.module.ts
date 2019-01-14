import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {BoardComponent} from './board/board.component';
import {ResultComponent} from './result/result.component';

const routes: Routes = [
  {
    path: 'game',
    component: BoardComponent
  },
  {
    path: 'result',
    component: ResultComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  { path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
