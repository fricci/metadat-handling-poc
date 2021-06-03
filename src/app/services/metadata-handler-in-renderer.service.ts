import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { loadMetadataActions, LoadMetadataActionType, metadataArrivedType } from '../store/metadata-action.actions';
import { MainService } from './main.service';

@Injectable()
export class MetadataHandlerInRenderer {

    loadMetadata$ = createEffect(() => this.actions$.pipe(
        ofType<LoadMetadataActionType>(loadMetadataActions),
        mergeMap((action) => this.mainService.getMetadataById(action.id).pipe(
            map(result => ({
                type: metadataArrivedType,
                payload: {
                    id: action.id,
                    metadata: result
                }
            }))
        ))));

    constructor(
        private actions$: Actions<any>,
        private mainService: MainService
    ) { }
}