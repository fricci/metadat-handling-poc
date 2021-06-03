import { createAction, props } from '@ngrx/store';
import { MetadataId } from './model/view-metadata.model';

export const loadMetadataType = '[MetadataAction] Load MetadataActions';

export const loadMetadataActions = createAction(
  loadMetadataType,
  props<MetadataId>()
);

export type LoadMetadataActionType = ReturnType<typeof loadMetadataActions>;


