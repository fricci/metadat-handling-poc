import watch from 'redux-watch';
import { BehaviorSubject, Observable } from 'rxjs';
import { ViewMetadata } from '../store/model/view-metadata.model';
import store, { registerReducer, Store } from '../store/store';
import objectPath from 'object-path';
import { MetadataHandlerInRenderer } from '../services/metadata-handler-in-renderer.service';
import produce from 'immer';
import { WritableDraft } from 'immer/dist/internal';
import { distinct, map } from 'rxjs/operators';

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

function movePositionReducer(state: Store, action) {
    return produce<Store>(state, draftState => {
        const screenId = action.payload.id;
        const boxId = action.payload.boxId;
        const newX = action.payload.x;
        const newY = action.payload.y;
        const position = positionMetadata(screenMetadata(screenId, draftState))
        position.x = newX;
        position.y = newY;
    });
}



export function registerPageReducers() {
    registerReducer(moveBoxPosition, movePositionReducer);
}

class Metadata<T, P> {

    public state: BehaviorSubject<ViewMetadata<T, P>>;

    constructor(protected metadataService: MetadataHandlerInRenderer, protected id: string) { 
        store.dispatch(this.metadataService.findMetadataById(this.id));
        this.state = new BehaviorSubject<ViewMetadata<T, P>>(objectPath.get(store.getState(), `metadata.${this.id}`));
        let w = watch(store.getState, `metadata.${this.id}`);
        store.subscribe(w((newVal, oldVal, objectPath) => {
            this.state.next(newVal);
        }))
    }
}

export class PageMetadata extends Metadata<PageTransientData, PagePersistentData> {

    constructor(metadataService: MetadataHandlerInRenderer, id: string) {
        super(metadataService, id);
    }

    get x() {
        return this.state.value.persistent.boxPosition.x;
    }

    get y() {
        return this.state.value.persistent.boxPosition.y;
    }

    get x$(): Observable<string> {
        return this.state.pipe(map((state:
            ViewMetadata<PageTransientData, PagePersistentData>) => state?.persistent?.boxPosition?.x), distinct());
    }

    get y$(): Observable<string> {
        return this.state.pipe(map((state:
            ViewMetadata<PageTransientData, PagePersistentData>) => state?.persistent?.boxPosition?.y), distinct());
    }

    move(newX: string, newY: string) {
        store.dispatch(moveBoxPositionAction({id: this.id, x: newX, y: newY}))
    }
}
