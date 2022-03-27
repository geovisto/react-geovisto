// Geovisto core
import { LatLngBoundsLiteral } from "leaflet";
import {
    ILayerToolDimensions,
    ILayerToolDimensionsConfig,
    ILayerToolState
} from "../../../../../../index.core";

import IBlueSkyLayerToolConfig from "./IBlueSkyLayerToolConfig";
import IBlueSkyLayerToolDefaults from "./IBlueSkyLayerToolDefaults";
import IBlueSkyLayerToolProps from "./IBlueSkyLayerToolProps";

/**
 * This interface declares functions for using the state of the layer tool.
 * 
 * @author Jiri Hynek
 */
interface IBlueSkyLayerToolState<
    TProps extends IBlueSkyLayerToolProps = IBlueSkyLayerToolProps,
    TDefaults extends IBlueSkyLayerToolDefaults = IBlueSkyLayerToolDefaults,
    TConfig extends IBlueSkyLayerToolConfig = IBlueSkyLayerToolConfig,
    TDimensionsConfig extends ILayerToolDimensionsConfig = ILayerToolDimensionsConfig,
    TDimensions extends ILayerToolDimensions = ILayerToolDimensions
> extends ILayerToolState<TProps, TDefaults, TConfig, TDimensionsConfig, TDimensions> {

    /**
     * It returns a base map ID.
     */
    getUrl(): string;

    /**
     * It sets a base map ID.
     * 
     * @param url
     */
    setUrl(url: string): void;


    /**
     * It returns a base map ID.
     */
    getBounds(): LatLngBoundsLiteral;

    /**
     * It sets a base map ID.
     * 
     * @param bounds
     */
    setBounds(bounds: LatLngBoundsLiteral): void;

        
    /**
     * It returns a Leaflet tile layer.
     */
    getTileLayer(): L.ImageOverlay | undefined;

    /**
     * It sets a Leaflet tile layer.
     * 
     * @param layer 
     */
    setTileLayer(layer: L.ImageOverlay): void;
}
export default IBlueSkyLayerToolState;