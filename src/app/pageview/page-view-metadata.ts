import { ViewMetadata } from '../store/model/view-metadata.model';

export interface PageTransientData {
    selectedElementId: string;
}

export interface PagePersistentData {
    boxPosition: {
        x: string;
        y: string;
    }
}

export interface PageViewMetadata extends ViewMetadata<PageTransientData, PagePersistentData> {
    
}