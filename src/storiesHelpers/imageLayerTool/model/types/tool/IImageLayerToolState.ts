// Geovisto 
import {ILayerToolDimensions, ILayerToolDimensionsConfig, ILayerToolState } from "geovisto";

// Leaflet
import { LatLngBoundsLiteral } from "leaflet";

import IImageLayerToolConfig from "./IImageLayerToolConfig";
import IImageLayerToolDefaults from "./IImageLayerToolDefaults";
import IImageLayerToolProps from "./IImageLayerToolProps";


/**
 * This interface declares functions for using the state of the layer tool.
 */
interface IImageLayerToolState<
    TProps extends IImageLayerToolProps = IImageLayerToolProps,
    TDefaults extends IImageLayerToolDefaults = IImageLayerToolDefaults,
    TConfig extends IImageLayerToolConfig = IImageLayerToolConfig,
    TDimensionsConfig extends ILayerToolDimensionsConfig = ILayerToolDimensionsConfig,
    TDimensions extends ILayerToolDimensions = ILayerToolDimensions
> extends ILayerToolState<TProps, TDefaults, TConfig, TDimensionsConfig, TDimensions> {

    /**
     * It returns an image source url.
     */
    getUrl(): string;

    /**
     * It sets an image source url.
     * 
     * @param url
     */
    setUrl(url: string): void;


    /**
     * It returns an image bounds.
     */
    getBounds(): LatLngBoundsLiteral;

    /**
     * It sets an image bounds.
     * 
     * @param bounds
     */
    setBounds(bounds: LatLngBoundsLiteral): void;


    /**
     * It returns a Leaflet image layer.
     */
    getImageLayer(): L.ImageOverlay | undefined;

    /**
     * It sets a Leaflet image layer.
     * 
     * @param layer 
     */
    setImageLayer(layer: L.ImageOverlay): void;
}
export default IImageLayerToolState;