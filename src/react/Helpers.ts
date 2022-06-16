// Geovisto core
import { ILayerTool, IMapTool } from 'geovisto';

/**
 * Checks if id is present and valid
 */
export const validateId = (id: string | undefined) : void => {
    if(id === undefined || typeof id !== 'string') {
        throw Error(`Processed tool is missing 'id' property`);
    }
};

/**
 * Returns if object implements ILayerTool interface
 */
export const isLayerTool = (tool: IMapTool): tool is ILayerTool => {
    return 'getLayerItems' in tool;
};