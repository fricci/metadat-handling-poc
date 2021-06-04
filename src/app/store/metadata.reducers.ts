import { produce } from 'immer';
import { metadataArrivedType } from './metadata-action.actions';
import { registerReducer } from './store';

export function registerCommonMetadata() {
    registerReducer(metadataArrivedType, (state, action) => {
        return produce(state, draftState => {
            draftState[action.payload.id] = action.payload.payload
        });
    })
}