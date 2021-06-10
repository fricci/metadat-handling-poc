import { produce } from 'immer';
import { ViewMetadata } from './model/view-metadata.model';
import { Store } from './store';

export function metadataArrivedReducer(state: Store, action)  {
    return produce(state, draftState => {
        const metaParam: ViewMetadata<any, any> = {
            persistent: {},
            transient: {}
        }
        metaParam.persistent = action.payload.payload;
        draftState[action.payload.id] = metaParam;
    });
}
