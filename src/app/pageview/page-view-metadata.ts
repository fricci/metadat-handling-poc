import watch from 'redux-watch';
import { BehaviorSubject, Observable } from 'rxjs';
import { ViewMetadata } from '../store/model/view-metadata.model';
import store from '../store/store';

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

export function boxPositionObserver(pageId: string): Observable<Position> {
    const subject = new BehaviorSubject<Position>(null);
    let w = watch(store.getState, `${pageId}.boxPosition`);
    store.subscribe(w((newVal, oldVal, objectPath) => {
        subject.next(newVal);
    }))
    return subject;
}
