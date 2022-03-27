import { GeovistoChoroplethLayerTool, GeovistoMarkerLayerTool, GeovistoSidebarTool, 
         GeovistoThemesTool, GeovistoTilesLayerTool, IMapTool, ISidebarToolProps, } from '../';
import { IReactElement, IToolData } from './Types';
import { IChoroplethLayerToolProps, IMarkerLayerToolProps, IThemesToolProps,
        ITilesLayerToolProps } from '../tools';
import { CustomTool } from './components/CustomTool';
import { ChoroplethLayerTool, MarkerLayerTool, SidebarTool, ThemesTool, TilesLayerTool } from './components';
import { ILayerTool } from '../index.core';


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
        case TilesLayerTool:
            return GeovistoTilesLayerTool.createTool(toolProps as ITilesLayerToolProps);
        case ChoroplethLayerTool:
            return GeovistoChoroplethLayerTool.createTool(toolProps as IChoroplethLayerToolProps);
        case MarkerLayerTool:
            return GeovistoMarkerLayerTool.createTool(toolProps as IMarkerLayerToolProps);    
        case ThemesTool:
            return GeovistoThemesTool.createTool(toolProps as IThemesToolProps);
        case CustomTool:
            return toolData.createTool(toolProps);
        default:
            throw new Error('Error: Unknown type of the tool. Component is not valid.');
    }
};

/**
 * Returns if object implements ILayerTool interface
 */
export const isLayerTool = (tool: any): tool is ILayerTool => {
    return 'getLayerItems' in tool;
};