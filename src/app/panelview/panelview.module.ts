import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PanelViewComponent } from './panelview.component';
import { FormsModule } from '@angular/forms';
import { registerSlice } from '../store/reducer-provider';
import { addNewElementReducer, modifyElementActionType } from './panel-view-metadata';

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
      metadata: [
        {
          action: modifyElementActionType,
          reducer: addNewElementReducer
        }
      ]
    })
  ]
})
export class PanelViewModule { }