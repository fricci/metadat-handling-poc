import watch from 'redux-watch';
import { BehaviorSubject, Observable } from 'rxjs';
import { ViewMetadata } from '../store/model/view-metadata.model';
import store, { registerReducer } from '../store/store';
import objectPath from 'object-path';
import { MetadataHandlerInRenderer } from '../services/metadata-handler-in-renderer.service';
import produce from 'immer';

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
    const subject = new BehaviorSubject<Position>(objectPath.get(store.getState(), `${pageId}.boxPosition`));
    let w = watch(store.getState, `${pageId}.boxPosition`);
    store.subscribe(w((newVal, oldVal, objectPath) => {
        subject.next(newVal);
    }))
    return subject;
}

function screenMetadata(screenId: string, draftState) {
    if (!draftState[screenId]) {
        draftState[screenId] = {};
    }
    return draftState[screenId];
}

function positionMetadata(draftState) {
    if (!draftState.boxPosition) {
        draftState.boxPosition = {};
    }
    return draftState.boxPosition;
}

export function registerPageReducers() {
    registerReducer(moveBoxPosition, (state, action) => {
        return produce(state, draftState => {
            const screenId = action.payload.id;
            const boxId = action.payload.boxId;
            const newX = action.payload.x;
            const newY = action.payload.y;
            positionMetadata(screenMetadata(screenId, draftState)).x = newX;
            positionMetadata(screenMetadata(screenId, draftState)).y = newY;
        });
    })
}

