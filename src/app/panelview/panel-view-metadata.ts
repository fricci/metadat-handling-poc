import { ViewMetadata } from '../store/model/view-metadata.model';

export interface PanelTransientData {
    panelInReadonlyMode: boolean;
}

export interface PanelPersistentData {
    uiElementsOutOfThePanel: string[];
}

export interface PanelViewMetadata extends ViewMetadata<PanelTransientData, PanelPersistentData> {
    
}