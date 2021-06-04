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

    constructor(private mainService: MainService) { }

    findMetadataById(id: string): ThunkAction<void, {}, unknown, AnyAction> {
        return (dispatch) => {
            if (!objectPath.has(store.getState(), id)) {
                this.mainService.getMetadataById(id).pipe(take(1)).toPromise().then((json) => {
                    return dispatch(metadataArrivedAction({ id, payload: json }));
                });
            }
        }
    }
}
