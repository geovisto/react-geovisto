// Internal imports
import { ChoroplethLayerToolType, ConnectionLayerToolType, CustomToolType, FiltersToolType, MarkerLayerToolType, 
         SelectionToolType, SidebarToolType, ThemesToolType, TilesLayerToolType, ToolGroupType } from './internal';
import { ISupportedToolComponent, ISupportedTopLevelComponent } from "./types";

/**
 * Constants optionally passed as parameter in onToolTypeChange callback
 */
export const ENABLED_PROP = 'enabled';
export const ID_PROP = 'id';

/**
 * Set of supported components 
 */
export const supportedComponentTypes : ISupportedToolComponent[] = [
    ChoroplethLayerToolType,
    ConnectionLayerToolType,
    CustomToolType,
    FiltersToolType,
    MarkerLayerToolType,
    SelectionToolType,
    SidebarToolType,
    ThemesToolType,
    TilesLayerToolType,
];

/**
 * Set of supported components 
 */
 export const supportedTopLevelComponentTypes : ISupportedTopLevelComponent[] = [
    ToolGroupType
];