import { GeovistoChoroplethLayerTool, GeovistoMarkerLayerTool, GeovistoSidebarTool, 
         GeovistoThemesTool, GeovistoTilesLayerTool, IMapTool, ISidebarToolProps } from '../';
import { ChoroplethLayerTool, ConnectionLayerTool, CustomTool, FiltersTool, MarkerLayerTool, 
         SelectionTool, 
         SidebarTool, ThemesTool, TilesLayerTool } from './components';
import { IReactElement, IToolData } from './types';

import { ILayerTool } from '../index.core';
import { GeovistoConnectionLayerTool, GeovistoFiltersTool, GeovistoSelectionTool, IChoroplethLayerToolProps, IConnectionLayerToolProps, IFiltersToolProps, IMarkerLayerToolProps, ISelectionToolProps, IThemesToolProps,
        ITilesLayerToolProps } from '../tools';


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
export const processTool = (toolType: IReactElement, toolData: IToolData): IMapTool => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { children, onToolChange, ...toolProps } = toolData;

    switch (toolType) {
        case SidebarTool:
            return GeovistoSidebarTool.createTool(toolProps as ISidebarToolProps);
        case ChoroplethLayerTool:
            return GeovistoChoroplethLayerTool.createTool(toolProps as IChoroplethLayerToolProps);
        case ConnectionLayerTool:
            return GeovistoConnectionLayerTool.createTool(toolProps as IConnectionLayerToolProps);
        case FiltersTool:
            return GeovistoFiltersTool.createTool(toolProps as IFiltersToolProps);
        case MarkerLayerTool:
            return GeovistoMarkerLayerTool.createTool(toolProps as IMarkerLayerToolProps);
        case SelectionTool:
            return GeovistoSelectionTool.createTool(toolProps as ISelectionToolProps);
        case ThemesTool:
            return GeovistoThemesTool.createTool(toolProps as IThemesToolProps);
        case TilesLayerTool:
            return GeovistoTilesLayerTool.createTool(toolProps as ITilesLayerToolProps);
        case CustomTool:
            return toolData.createTool(toolProps);
        default:
            throw new Error('Unknown component type to process. Please add constructor of the tool instance.');
    }
};

/**
 * Returns if object implements ILayerTool interface
 */
export const isLayerTool = (tool: any): tool is ILayerTool => {
    return 'getLayerItems' in tool;
};