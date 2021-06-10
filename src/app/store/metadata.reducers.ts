import { ViewMetadata } from './model/view-metadata.model';
import { Store } from './store';

export function metadataArrivedReducer(state: Store, action) {
    const metaParam: ViewMetadata<any, any> = {
        persistent: {},
        transient: {}
    }
    metaParam.persistent = action.payload.payload;
    state[action.payload.id] = metaParam;
    return state;
}
