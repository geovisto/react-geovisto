import { ChoroplethLayerTool, MarkerLayerTool, SidebarTool, ThemesTool, TilesLayerTool } from "./components/index";
import { ISupportedToolComponent } from "./Types";

export const TILES_ID = "geovisto-tool-layer-map";
export const SIDEBAR_ID = "geovisto-tool-sidebar";
export const CHOROPLETH_ID = "geovisto-tool-layer-choropleth";
export const THEMES_ID = "geovisto-tool-themes";
export const MARKER_ID = "geovisto-tool-layer-marker";
export const CONNECTION_ID = "geovisto-tool-layer-connection";
export const TIMELINE_ID = "geovisto-tool-timeline";
export const SELECTION_ID = "geovisto-tool-selection";
export const FILTERS_ID = "geovisto-tool-filters";

export const ENABLED_PROP = 'enabled';
export const ID_PROP = 'id';

export const supportedComponentTypes : ISupportedToolComponent[] = [
    SidebarTool,
    TilesLayerTool,
    ChoroplethLayerTool,
    MarkerLayerTool,
    ThemesTool,
    // TODO: Add Custom tool component (that implements ILayerTool);
];