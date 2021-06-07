import watch from 'redux-watch';
import { BehaviorSubject, Observable } from 'rxjs';
import { ViewMetadata } from '../store/model/view-metadata.model';
import store, { registerReducer, Store } from '../store/store';
import objectPath from 'object-path';
import { MetadataHandlerInRenderer } from '../services/metadata-handler-in-renderer.service';
import produce from 'immer';
import { WritableDraft } from 'immer/dist/internal';

export interface PageTransientData {
    selectedElementId: string;
}

export interface PagePersistentData {
    boxPosition: Position;
}

export interface Position {
    x: string;
    y: string;
}

export interface PageViewMetadata extends ViewMetadata<PageTransientData, PagePersistentData> {

}

export const moveBoxPosition = '[PageViewActions] moveBoxPosition';

export function moveBoxPositionAction(payload: { id: string, x: string, y: string }) {
    return { type: moveBoxPosition, payload };
}

export function boxPositionObserver(metadataService: MetadataHandlerInRenderer, pageId: string): Observable<Position> {
    store.dispatch(metadataService.findMetadataById(pageId));
    const subject = new BehaviorSubject<Position>(objectPath.get(store.getState(), `metadata.persistent.${pageId}.boxPosition`));
    let w = watch(store.getState, `metadata.${pageId}.persistent.boxPosition`);
    store.subscribe(w((newVal, oldVal, objectPath) => {
        console.log(newVal);
        subject.next(newVal);
    }))
    return subject;
}

function screenMetadata(screenId: string, draftState: WritableDraft<Store>) {
    if (!draftState.metadata[screenId]) {
        draftState.metadata[screenId] = {
            persistent: {},
            transient: {}
        };
    }
    return draftState.metadata[screenId];
}

function positionMetadata(draftState) {
    if (!draftState.boxPosition) {
        draftState.persistent.boxPosition = {};
    }
    return draftState.persistent.boxPosition;
}

export function registerPageReducers() {
    registerReducer(moveBoxPosition, (state: Store, action) => {
        return produce<Store>(state, draftState => {
            const screenId = action.payload.id;
            const boxId = action.payload.boxId;
            const newX = action.payload.x;
            const newY = action.payload.y;
            const position = positionMetadata(screenMetadata(screenId, draftState))
            position.x = newX;
            position.y = newY;
        });
    })
}

