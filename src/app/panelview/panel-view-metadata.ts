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

export function metadataSelector(id: string) {
    return state$.pipe(map(state => objectPath.get(state, `metadata.${id}`), distinct()));
}

export function persistentMetadataSelector(id: string) {
    return metadataSelector(id).pipe(map(state => objectPath.get(state, `persistent`), distinct()));
}

export function uiElementsOutOfThePanelObserver(metadataService: MetadataHandlerInRenderer, panelId: string): Observable<string[]> {
    store.dispatch(metadataService.findMetadataById(panelId));
    return persistentMetadataSelector(panelId).pipe(map(state => objectPath.get(state, `uiElementsOutOfThePanel`), distinct()));
}