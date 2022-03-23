// Geovisto core
import {
    ILayerTool,
    IMapToolInitProps
} from "../../../../../../index.core";

import IBlueSkyLayerToolConfig from "./IBlueSkyLayerToolConfig";
import IBlueSkyLayerToolDefaults from "./IBlueSkyLayerToolDefaults";
import IBlueSkyLayerToolState from "./IBlueSkyLayerToolState";
import IBlueSkyLayerToolProps from "./IBlueSkyLayerToolProps";

/**
 * This interface declares Tiles layer tool.
 * 
 * @author Jiri Hynek
 */
interface IBlueSkyLayerTool<
    TProps extends IBlueSkyLayerToolProps = IBlueSkyLayerToolProps,
    TDefaults extends IBlueSkyLayerToolDefaults = IBlueSkyLayerToolDefaults,
    TState extends IBlueSkyLayerToolState = IBlueSkyLayerToolState,
    TConfig extends IBlueSkyLayerToolConfig = IBlueSkyLayerToolConfig,
    TInitProps extends IMapToolInitProps<TConfig> = IMapToolInitProps<TConfig>
> extends ILayerTool<TProps, TDefaults, TState, TConfig, TInitProps> {

    /**
     * It creates a copy of the uninitialized tool.
     */
    copy(): ILayerTool;
}

export default IBlueSkyLayerTool;