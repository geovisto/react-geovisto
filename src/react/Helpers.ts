// React
import React, { ReactNode } from 'react';

// Geovisto core
import { ILayerTool, IMapTool } from 'geovisto';

// Geovisto modules
import { GeovistoFiltersTool, IFiltersToolProps } from 'geovisto-filters';
import { GeovistoChoroplethLayerTool, IChoroplethLayerToolProps } from 'geovisto-layer-choropleth';
import { GeovistoConnectionLayerTool, IConnectionLayerToolProps } from 'geovisto-layer-connection';
import { GeovistoMarkerLayerTool, IMarkerLayerToolProps } from 'geovisto-layer-marker';
import { GeovistoTilesLayerTool, ITilesLayerToolProps } from 'geovisto-layer-tiles';
import { GeovistoSelectionTool, ISelectionToolProps } from 'geovisto-selection';
import { GeovistoSidebarTool, ISidebarToolProps } from 'geovisto-sidebar';
import { GeovistoThemesTool, IThemesToolProps } from 'geovisto-themes';

// Internal imports
import { ChoroplethLayerToolType, ConnectionLayerToolType, CustomToolType, FiltersToolType, MarkerLayerToolType, 
         SelectionToolType, SidebarTabType, SidebarToolType, ThemesToolType, TilesLayerToolType } from './internal';
import { IReactElement, IToolData } from './types';


/**
 * Checks if id is present and valid
 */
export const validateId = (id: string | undefined) : void => {
    if(id === undefined || typeof id !== 'string') {
        throw Error(`Processed tool is missing 'id' property`);
    }
};

/**
 * Returns tool in a Geovisto library representation
 */
export const getToolInstance = (toolType: IReactElement, toolData: IToolData): IMapTool => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { children, onToolChange, ...toolProps } = toolData;

    switch (toolType) {
        case SidebarToolType:
            return GeovistoSidebarTool?.createTool(toolProps as ISidebarToolProps);
        case ChoroplethLayerToolType:
            return GeovistoChoroplethLayerTool?.createTool(toolProps as IChoroplethLayerToolProps);
        case ConnectionLayerToolType:
            return GeovistoConnectionLayerTool?.createTool(toolProps as IConnectionLayerToolProps);
        case FiltersToolType:
            return GeovistoFiltersTool?.createTool(toolProps as IFiltersToolProps);
        case MarkerLayerToolType:
            return GeovistoMarkerLayerTool?.createTool(toolProps as IMarkerLayerToolProps);
        case SelectionToolType:
            return GeovistoSelectionTool?.createTool(toolProps as ISelectionToolProps);
        case ThemesToolType:
            return GeovistoThemesTool?.createTool(toolProps as IThemesToolProps);
        case TilesLayerToolType:
            return GeovistoTilesLayerTool?.createTool(toolProps as ITilesLayerToolProps);
        case CustomToolType:
            return toolData.createTool(toolProps);
        default:
            throw new Error('Unknown component type to process. Please add constructor of the tool instance.');
    }
};

/**
 * Returns if object implements ILayerTool interface
 */
export const isLayerTool = (tool: IMapTool): tool is ILayerTool => {
    return 'getLayerItems' in tool;
};

/**
 * Check if React element is SidebarTab
 * Exported as helper method because of circular dependency
 */
export const isSidebarTab = (element: ReactNode) => {
    return React.isValidElement(element) && element.type == SidebarTabType;
}