import { Observable } from 'rxjs';
import { MetadataHandlerInRenderer } from '../services/metadata-handler-in-renderer.service';
import { ViewMetadata } from '../store/model/view-metadata.model';
import objectPath from 'object-path';
import store, { state$ } from '../store/store';
import { distinct, map } from 'rxjs/operators';

export interface PanelTransientData {
    panelInReadonlyMode: boolean;
}

export interface PanelPersistentData {
    uiElementsOutOfThePanel: string[];
}

export interface PanelViewMetadata extends ViewMetadata<PanelTransientData, PanelPersistentData> {
    
}

export function uiElementsOutOfThePanelObserver(metadataService: MetadataHandlerInRenderer, panelId: string): Observable<string[]> {
    let startValue = null;
    if(!objectPath.has(store.getState(), `${panelId}.uiElementsOutOfThePanel`)) {
        store.dispatch(metadataService.findMetadataById(panelId));
    } else {
        startValue = objectPath.get(store.getState(), `${panelId}.uiElementsOutOfThePanel`)
    }
    return state$.pipe(map(state => objectPath.get(state, `${panelId}.uiElementsOutOfThePanel`), distinct()));
}