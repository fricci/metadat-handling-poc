import { Component } from '@angular/core';
import { MetadataHandlerInRenderer } from './services/metadata-handler-in-renderer.service';
import { PhxStore } from './store/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  pageId: string;
  panelId: string;

  constructor(private store: PhxStore, private metadataService: MetadataHandlerInRenderer) {
    
  }

  onSave() {
    this.store.dispatch(this.metadataService.saveMetadata());
  }

}
