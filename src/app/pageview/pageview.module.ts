import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PageViewComponent } from './pageview.component';
import { FormsModule } from '@angular/forms';
import { registerPageReducers } from './page-view-metadata';

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
    registerPageReducers();
  }
}
