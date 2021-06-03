import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PanelViewComponent } from './panelview.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PanelViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ]
})
export class PanelViewModule { }