import { Observable } from 'rxjs';
import { MetadataHandlerInRenderer } from '../services/metadata-handler-in-renderer.service';
import { ViewMetadata } from '../store/model/view-metadata.model';
import objectPath from 'object-path';
import { PhxStore, Store } from '../store/store';
import { distinct, map } from 'rxjs/operators';

export interface PanelTransientData {
    panelInReadonlyMode: boolean;
}

export interface PanelPersistentData {
    uiElementsOutOfThePanel: string[];
}

export interface PanelViewMetadata extends ViewMetadata<PanelTransientData, PanelPersistentData> {

}

export function addNewElementReducer(state: Store, action) {
    state[action.payload.id].persistent.uiElementsOutOfThePanel = action.payload.uiElementsOutOfThePanel
    return state;
}

export const modifyElementActionType = '[PANEL] modifyElement';

export function modifyElement(id: string, uiElementsOutOfThePanel: string[]) {
    return {
        type: modifyElementActionType, payload: {
            id, uiElementsOutOfThePanel
        }
    };
}

export function metadataSelector(store: PhxStore, id: string) {
    return store.state$.pipe(map(state => objectPath.get(state, `metadata.${id}`), distinct()));
}

export function persistentMetadataSelector(store: PhxStore, id: string) {
    return metadataSelector(store, id).pipe(map(state => objectPath.get(state, `persistent`), distinct()));
}

export function uiElementsOutOfThePanelObserver(store: PhxStore, metadataService: MetadataHandlerInRenderer, panelId: string): Observable<string[]> {
    store.dispatch(metadataService.findMetadataById(panelId));
    return persistentMetadataSelector(store, panelId).pipe(map(state => objectPath.get(state, `uiElementsOutOfThePanel`), distinct()));
}