import { Component } from '@angular/core';
import { MetadataHandlerInRenderer } from './services/metadata-handler-in-renderer.service';
import store from './store/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  pageId: string;
  panelId: string;

  constructor(private metadataService: MetadataHandlerInRenderer) {
    
  }

  onSave() {
    store.dispatch(this.metadataService.saveMetadata());
  }

}
