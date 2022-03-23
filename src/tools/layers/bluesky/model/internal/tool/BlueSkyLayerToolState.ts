// Geovisto core
import {
    LayerToolState,
    IMapToolInitProps,
    IMapTilesModel
} from "../../../../../../index.core";

import IBlueSkyLayerToolState from "../../types/tool/IBlueSkyLayerToolState";
import IBlueSkyLayerTool from "../../types/tool/IBlueSkyLayerTool";
import IBlueSkyLayerToolProps from "../../types/tool/IBlueSkyLayerToolProps";
import IBlueSkyLayerToolDefaults from "../../types/tool/IBlueSkyLayerToolDefaults";
import IBlueSkyLayerToolConfig from "../../types/tool/IBlueSkyLayerToolConfig";

/**
 * This class provide functions for using the state of the tiles layer tool.
 * 
 * @author Jiri Hynek
 */
class BlueSkyLayerToolState extends LayerToolState implements IBlueSkyLayerToolState {
    
    private tilesModel!: IMapTilesModel;
    private layer?: L.ImageOverlay;

    /**
     * It creates a tool state.
     */
    public constructor(tool: IBlueSkyLayerTool) {
        super(tool);
    }

    /**
     * It resets state with respect to initial props.
     */
    public initialize(defaults: IBlueSkyLayerToolDefaults, props: IBlueSkyLayerToolProps, initProps: IMapToolInitProps<IBlueSkyLayerToolConfig>): void {
        // the map layer tool properties
        // this.setBaseMap(props.baseMap == undefined ? defaults.getBaseMap() : props.baseMap);

        // set super props
        super.initialize(defaults, props, initProps);
    }

    /**
     * The metod takes config and deserializes the values.
     * 
     * @param config 
     */
    public deserialize(config: IBlueSkyLayerToolConfig): void {
        super.deserialize(config);

        // the map layer tool config
        // TODO
    }

    /**
     * The method serializes the tool state. Optionally, defaults can be set if property is undefined.
     * 
     * @param defaults
     */
    public serialize(defaults: IBlueSkyLayerToolDefaults | undefined): IBlueSkyLayerToolConfig {
        const config: IBlueSkyLayerToolConfig = <IBlueSkyLayerToolConfig> super.serialize(defaults);

        // serialize the map layer tool properties
        // TODO

        return config;
    }

    /**
     * It returns a Leaflet tile layer.
     */
    public getTileLayer(): L.ImageOverlay | undefined {
        return this.layer;
    }

    /**
     * It sets a Leaflet tile layer.
     * 
     * @param layer 
     */
    public setTileLayer(layer: L.ImageOverlay): void {
        this.layer = layer;
    }
}
export default BlueSkyLayerToolState;