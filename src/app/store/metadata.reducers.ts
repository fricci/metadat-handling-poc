import { createReducer, on } from '@ngrx/store';
import { produce } from 'immer';
import { metadataArrivedActions } from './metadata-action.actions';

export const metadataReducer = createReducer(
    {},
    on(metadataArrivedActions, (state, action) => {
        console.log(action);
        return produce(state, draftState => {
            draftState[action.payload.id] = action.payload.metadata
        });
    })
  );