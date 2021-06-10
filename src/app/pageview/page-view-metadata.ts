import watch from 'redux-watch';
import { Observable } from 'rxjs';
import { ViewMetadata } from '../store/model/view-metadata.model';
import  { PhxStore, Store } from '../store/store';
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

export const moveBoxPosition = '[PAGE] moveBoxPosition';

export function moveBoxPositionAction(payload: { id: string, x: string, y: string }) {
    return { type: moveBoxPosition, payload };
}

function screenMetadata(screenId: string, draftState: WritableDraft<Store>) {
    if (!draftState[screenId]) {
        draftState[screenId] = {
            persistent: {},
            transient: {}
        };
    }
    return draftState[screenId];
}

function positionMetadata(draftState) {
    if (!draftState.boxPosition) {
        draftState.persistent.boxPosition = {};
    }
    return draftState.persistent.boxPosition;
}

export function movePositionReducer(state: Store, action) {
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

class Metadata<T, P> {

    public state$: Observable<ViewMetadata<T, P>>;

    constructor(protected store: PhxStore, protected metadataService: MetadataHandlerInRenderer, protected id: string) {
        store.dispatch(this.metadataService.findMetadataById(this.id));
        this.state$ = this.store.state$.pipe(map(state => objectPath.get(state, `metadata.${id}`), distinct()));
    }

    public get state(): ViewMetadata<T, P> {
        return objectPath.get(this.store.getState(), `metadata.${this.id}`);
    }
}

export class PageMetadata extends Metadata<PageTransientData, PagePersistentData> {

    constructor(store: PhxStore, metadataService: MetadataHandlerInRenderer, id: string) {
        super(store, metadataService, id);
    }

    get x() {
        return this.state.persistent.boxPosition.x;
    }

    get y() {
        return this.state.persistent.boxPosition.y;
    }

    get x$(): Observable<string> {
        return this.state$.pipe(map((state:
            ViewMetadata<PageTransientData, PagePersistentData>) => state?.persistent?.boxPosition?.x), distinct());
    }

    get y$(): Observable<string> {
        return this.state$.pipe(map((state:
            ViewMetadata<PageTransientData, PagePersistentData>) => state?.persistent?.boxPosition?.y), distinct());
    }

    get boxPosition$(): Observable<Position> {
        return this.state$.pipe(map((state:
            ViewMetadata<PageTransientData, PagePersistentData>) => state?.persistent?.boxPosition), distinct());
    }

    move(newX: string, newY: string) {
        this.store.dispatch(moveBoxPositionAction({ id: this.id, x: newX, y: newY }))
    }
}
