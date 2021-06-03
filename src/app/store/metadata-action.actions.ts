import { createAction, props } from '@ngrx/store';
import { MetadataId } from './model/view-metadata.model';

export const loadMetadataType = '[MetadataAction] Load MetadataActions';
export const metadataArrivedType = '[MetadataAction] MetadataArrived Actions';

export const loadMetadataActions = createAction(
  loadMetadataType,
  props<MetadataId>()
);

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


