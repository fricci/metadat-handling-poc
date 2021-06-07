import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PageViewComponent } from './pageview.component';
import { FormsModule } from '@angular/forms';
import { registerReducer } from '../store/store';
import produce from 'immer';
import { moveBoxPosition } from './page-view-metadata';

@NgModule({
  declarations: [
    PageViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ]
})
export class PageViewModule {
  constructor() {
    registerReducer(moveBoxPosition, (state, action) => {
      return produce(state, draftState => {
        const screenId = action.payload.id;
        const boxId = action.payload.boxId;
        const newX = action.payload.x;
        const newY = action.payload.y;
        if (!state[screenId]) {
          draftState[screenId] = {};
        }
        if (!state[screenId].boxPosition) {
          draftState[screenId].boxPosition = {};
        }
        draftState[screenId].boxPosition.x = newX;
        draftState[screenId].boxPosition.y = newY;
      });
    })
  }
}
