import { Injectable } from '@angular/core';
import { AnyAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { metadataArrivedAction } from '../store/metadata-action.actions';
import store from '../store/store';
import { MainService } from './main.service';
import { take } from 'rxjs/operators';
import objectPath from 'object-path';

@Injectable({
    providedIn: 'root'
})
export class MetadataHandlerInRenderer {

    private inProgress = new Set<string>();

    constructor(private mainService: MainService) { }

    findMetadataById(id: string): ThunkAction<void, {}, unknown, AnyAction> {
        return (dispatch) => {
            if(this.inProgress.has(id)) {
                return;
            }
            this.inProgress.add(id);
            if (!objectPath.has(store.getState(), id)) {
                this.mainService.getMetadataById(id).pipe(take(1)).toPromise().then((json) => {
                    this.inProgress.delete(id);
                    return dispatch(metadataArrivedAction({ id, payload: json }));
                });
            }
        }
    }

    saveMetadata() {
        return (dispatch) => {
            const metadataToSave = {};
            const allMetadata = store.getState()?.metadata;
            const ids = Object.keys(allMetadata);
            for(const id of ids) {
                metadataToSave[id] = allMetadata[id].persistent;
            }
            this.mainService.saveMetadata(metadataToSave).then(() => dispatch({ type: 'Save success'}));
        }
    }
}
