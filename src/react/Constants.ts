import { ChoroplethLayerTool, ConnectionLayerTool, CustomTool, FiltersTool, SelectionTool,
         MarkerLayerTool, SidebarTool, ThemesTool, TilesLayerTool, ToolGroup } from "./components/index";
import { ISupportedToolComponent, ISupportedTopLevelComponent } from "./types";

/**
 * Constants optionally passed as parameter in onToolChange callback
 */
export const ENABLED_PROP = 'enabled';
export const ID_PROP = 'id';

/**
 * Set of supported components 
 */
export const supportedComponentTypes : ISupportedToolComponent[] = [
    ChoroplethLayerTool,
    ConnectionLayerTool,
    CustomTool,
    FiltersTool,
    MarkerLayerTool,
    SelectionTool,
    SidebarTool,
    ThemesTool,
    TilesLayerTool,
];

/**
 * Set of supported components 
 */
 export const supportedTopLevelComponentTypes : ISupportedTopLevelComponent[] = [
    ToolGroup
];