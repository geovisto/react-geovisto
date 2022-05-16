// Geovisto
import { ILayerTool, IMapToolInitProps } from "geovisto";

import IImageLayerToolConfig from "./IImageLayerToolConfig";
import IImageLayerToolDefaults from "./IImageLayerToolDefaults";
import IImageLayerToolState from "./IImageLayerToolState";
import IImageLayerToolProps from "./IImageLayerToolProps";

/**
 * This interface declares Image layer tool.
 */
interface IImageLayerTool<
    TProps extends IImageLayerToolProps = IImageLayerToolProps,
    TDefaults extends IImageLayerToolDefaults = IImageLayerToolDefaults,
    TState extends IImageLayerToolState = IImageLayerToolState,
    TConfig extends IImageLayerToolConfig = IImageLayerToolConfig,
    TInitProps extends IMapToolInitProps<TConfig> = IMapToolInitProps<TConfig>
> extends ILayerTool<TProps, TDefaults, TState, TConfig, TInitProps> {

    /**
     * It creates a copy of the uninitialized tool.
     */
    copy(): ILayerTool;
}

export default IImageLayerTool;