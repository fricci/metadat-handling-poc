import { produce } from 'immer';
import { metadataArrivedType } from './metadata-action.actions';
import { ViewMetadata } from './model/view-metadata.model';
import { PhxStore, Store } from './store';

export function registerCommonMetadata(store: PhxStore) {
    store.registerReducer(metadataArrivedType, (state: Store, action) => {
        return produce(state, draftState => {
            const metaParam: ViewMetadata<any, any> = {
                persistent: {},
                transient: {}
            }
            metaParam.persistent = action.payload.payload;
            draftState.metadata[action.payload.id] = metaParam;
        });
    })
}