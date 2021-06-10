import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PanelViewComponent } from './panelview.component';
import { FormsModule } from '@angular/forms';
import { registerSlice } from '../store/reducer-provider';
import { addNewElementReducer } from './panel-view-metadata';

@NgModule({
  declarations: [
    PanelViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    registerSlice({
      metadata: {
        modifyElement: addNewElementReducer
      }
    })
  ]
})
export class PanelViewModule { }