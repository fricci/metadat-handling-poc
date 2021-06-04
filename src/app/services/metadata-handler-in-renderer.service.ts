import { Injectable } from '@angular/core';
import { AnyAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { loadMetadataType, metadataArrivedAction } from '../store/metadata-action.actions';
import { registerReducer } from '../store/store';
import { MainService } from './main.service';
import { take, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MetadataHandlerInRenderer {

    constructor(private mainService: MainService) { }

    findMetadataById(id: string): ThunkAction<void, {}, unknown, AnyAction> {
        return (dispatch) => {
            this.mainService.getMetadataById(id).pipe(take(1)).toPromise().then((json) => {
                return dispatch(metadataArrivedAction({id, payload: json}))
            });
        }
    }


}
