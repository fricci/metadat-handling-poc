import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PageViewComponent } from './pageview.component';
import { FormsModule } from '@angular/forms';
import { registerReducer } from '../store/store';

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
        registerReducer('Page related reducer', (state, action) => {
            console.log('Page related reducer ', action);
            return state;
        })
    }
 }
