import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule } from '@angular/forms';
import { PanelViewModule } from './panelview/panelview.module';
import { PageViewModule } from './pageview/pageview.module';
import { registerCommonMetadata } from './store/metadata.reducers';
import { PhxStore } from './store/store';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(store: PhxStore) {
    registerCommonMetadata(store);
  }

}
