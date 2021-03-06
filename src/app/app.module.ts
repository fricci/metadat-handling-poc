import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule } from '@angular/forms';
import { PanelViewModule } from './panelview/panelview.module';
import { PageViewModule } from './pageview/pageview.module';
import { MetadataHandlerInRenderer } from './services/metadata-handler-in-renderer.service';
import { metadataReducer } from './store/metadata.reducers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot({
      metadata: metadataReducer
    }, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([MetadataHandlerInRenderer]),
    PanelViewModule,
    PageViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
