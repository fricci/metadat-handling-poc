import watch from 'redux-watch';
import { BehaviorSubject, Observable } from 'rxjs';
import { ViewMetadata } from '../store/model/view-metadata.model';
import store from '../store/store';
import objectPath from 'object-path';
import { MetadataHandlerInRenderer } from '../services/metadata-handler-in-renderer.service';

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

export function boxPositionObserver(metadataService: MetadataHandlerInRenderer, pageId: string): Observable<Position> {
    let startValue = null;
    if(!objectPath.has(store.getState(), `${pageId}.boxPosition`)) {
        store.dispatch(metadataService.findMetadataById(pageId));
    } else {
        startValue = objectPath.get(store.getState(), `${pageId}.boxPosition`)
    }
    const subject = new BehaviorSubject<Position>(startValue);
    let w = watch(store.getState, `${pageId}.boxPosition`);
    store.subscribe(w((newVal, oldVal, objectPath) => {
        subject.next(newVal);
    }))
    return subject;
}
