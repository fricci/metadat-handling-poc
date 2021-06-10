import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule } from '@angular/forms';
import { PanelViewModule } from './panelview/panelview.module';
import { PageViewModule } from './pageview/pageview.module';
import { metadataArrivedReducer } from './store/metadata.reducers';
import { registerSlice } from './store/reducer-provider';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    PanelViewModule,
    PageViewModule
  ],
  providers: [
    registerSlice({
      metadata: {
        metadataArrivedType: metadataArrivedReducer
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {


}
