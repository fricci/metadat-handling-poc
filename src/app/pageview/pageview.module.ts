import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PageViewComponent } from './pageview.component';
import { FormsModule } from '@angular/forms';
import { registerSlice } from '../store/reducer-provider';
import { moveBoxPosition, movePositionReducer } from './page-view-metadata';

@NgModule({
  declarations: [
    PageViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    registerSlice({
      metadata: [
        {
          action: moveBoxPosition,
          reducer: movePositionReducer
        }
      ]
    })
  ]
})
export class PageViewModule {
}
