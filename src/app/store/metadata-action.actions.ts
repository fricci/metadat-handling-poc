export const metadataArrivedType = '[MetadataAction] MetadataArrived Actions';
export const saveMetadataType = '[MetadataAction Save metadata';

export function metadataArrivedAction(payload) {
  return { type: metadataArrivedType, payload };
}

export function saveMetadataAction() {
  return { type: saveMetadataType };
}
