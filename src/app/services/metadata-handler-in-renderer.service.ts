import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { loadMetadataActions, LoadMetadataActionType } from '../store/metadata-action.actions';
import { MainService } from './main.service';

@Injectable()
export class MetadataHandlerInRenderer {

    loadMetadata$ = createEffect(() => this.actions$.pipe(
        ofType<LoadMetadataActionType>(loadMetadataActions),
        tap((action) => this.mainService.getMetadataById(action.id).then((result) => console.log(result)))), {dispatch: false});

    constructor(
        private actions$: Actions<any>,
        private mainService: MainService
    ) { }
}