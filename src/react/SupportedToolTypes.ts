import { ISupportedToolComponent } from "./types";
import { ChoroplethLayerTool } from './components/ChoroplethLayerTool';
import { ConnectionLayerTool } from './components/ConnectionLayerTool';
import { CustomTool } from './components/CustomTool';
import { FiltersTool } from './components/FiltersTool';
import { MarkerLayerTool } from './components/MarkerLayerTool';
import { SelectionTool } from './components/SelectionTool';
import { SidebarTool } from './components/SidebarTool';
import { ThemesTool } from './components/ThemesTool';
import { TilesLayerTool } from './components/TilesLayerTool';

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