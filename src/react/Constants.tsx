import { JSXElementConstructor } from "react";
import { IMapToolProps } from "../index.core";
import { ChoroplethLayerTool, MarkerLayerTool, SidebarTool, ThemesTool, TilesLayerTool } from "./components/index";
import { IToolDataProps } from "./components/Types";

export const TILES_ID = "geovisto-tool-layer-map";
export const SIDEBAR_ID = "geovisto-tool-sidebar";
export const CHOROPLETH_ID = "geovisto-tool-layer-choropleth";
export const THEMES_ID = "geovisto-tool-themes";
export const MARKER_ID = "geovisto-tool-layer-marker";
export const CONNECTION_ID = "geovisto-tool-layer-connection";
export const TIMELINE_ID = "geovisto-tool-timeline";
export const SELECTION_ID = "geovisto-tool-selection";
export const FILTERS_ID = "geovisto-tool-filters";

// Common type for component props
type IToolComponentProps = IToolDataProps<IMapToolProps>;

// Common type for all components 
type IToolComponent = ((props: IToolComponentProps) => JSX.Element);

// Common type for all components using useRef hook
type IToolRefComponent = React.ForwardRefExoticComponent<IToolComponentProps>

// All supported types of components
type ISupportedToolComponent = IToolComponent | IToolRefComponent | IReactElement;

// Default type for React Element (Needed for the comparision with supported components)
type IReactElement = string | JSXElementConstructor<unknown>;

export const supportedComponentTypes : ISupportedToolComponent[] = [
    SidebarTool,
    TilesLayerTool,
    ChoroplethLayerTool,
    MarkerLayerTool,
    ThemesTool,
    // TODO: Add Custom tool component (that implements ILayerTool);
];