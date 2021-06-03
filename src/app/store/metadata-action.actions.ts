import { createAction, props } from '@ngrx/store';
import { MetadataId } from './model/view-metadata.model';

export const loadMetadataActions = createAction(
  '[MetadataAction] Load MetadataActions',
  props<MetadataId>()
);




