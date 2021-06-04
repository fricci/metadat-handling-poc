import { MetadataId } from './model/view-metadata.model';
import { registerReducer } from './store';

export const loadMetadataType = '[MetadataAction] Load MetadataActions';
export const metadataArrivedType = '[MetadataAction] MetadataArrived Actions';

export function loadMetadataActions(payload) {
  return { type: loadMetadataType, payload };
}

export function metadataArrivedAction(payload) {
  return { type: metadataArrivedType, payload };
}

/*
export const metadataArrivedActions = createAction(
  metadataArrivedType,
  props<{
    payload: {
      id: string,
      metadata: any
    }
  }>()
);

export type LoadMetadataActionType = ReturnType<typeof loadMetadataActions>;
export type MetadataArrivedActionType = ReturnType<typeof metadataArrivedActions>;
*/

