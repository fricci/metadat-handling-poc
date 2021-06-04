import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { MetadataHandlerInRenderer } from '../services/metadata-handler-in-renderer.service';
import { metadataArrivedAction } from '../store/metadata-action.actions';
import store from '../store/store';
import { uiElementsOutOfThePanelObserver } from './panel-view-metadata';

@Component({
  selector: 'app-panelview',
  templateUrl: './panelview.component.html',
  styleUrls: ['./panelview.component.scss']
})
export class PanelViewComponent implements OnInit {

  id: string;
  uiElementsOutOfPanel$: Observable<string[]>;

  newUiElements: string;

  constructor(private route: ActivatedRoute,
    private metadataService: MetadataHandlerInRenderer) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.id = param.get('id');
      this.uiElementsOutOfPanel$ = uiElementsOutOfThePanelObserver(this.metadataService, this.id);
    })
  }

  newMetadata() {
    store.dispatch(metadataArrivedAction({id: this.id, payload: {
      uiElementsOutOfThePanel: this.newUiElements.split(',')
    }}))
  }
}
