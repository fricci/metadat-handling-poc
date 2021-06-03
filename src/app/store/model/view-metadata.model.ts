export interface ViewMetadata<TRANSIENT, PERSISTENT> {

    transient: TRANSIENT;
    persistent: PERSISTENT;
    
}

export interface MetadataId {
    id: string;
}