// Leaflet
import { LatLngBoundsLiteral } from "leaflet";

// Geovisto
import { LayerToolState, IMapToolInitProps } from "geovisto";

import IImageLayerToolState from "../../types/tool/IImageLayerToolState";
import IImageLayerTool from "../../types/tool/IImageLayerTool";
import IImageLayerToolProps from "../../types/tool/IImageLayerToolProps";
import IImageLayerToolDefaults from "../../types/tool/IImageLayerToolDefaults";
import IImageLayerToolConfig from "../../types/tool/IImageLayerToolConfig";

/**
 * This class provide functions for using the state of the image layer tool.
 */
class ImageLayerToolState extends LayerToolState implements IImageLayerToolState {
    
    private url!: string;
    private bounds!: LatLngBoundsLiteral;
    private layer?: L.ImageOverlay;

    /**
     * It creates a tool state.
     */
    public constructor(tool: IImageLayerTool) {
        super(tool);
    }

    /**
     * It resets state with respect to initial props.
     */
    public initialize(defaults: IImageLayerToolDefaults, props: IImageLayerToolProps, initProps: IMapToolInitProps<IImageLayerToolConfig>): void {

        this.setUrl(props.url == undefined ? defaults.getUrl() : props.url);
        this.setBounds(props.bounds == undefined ? defaults.getBounds() : props.bounds);

        console.log(this.getUrl());

        // set super props
        super.initialize(defaults, props, initProps);
    }

    /**
     * The metod takes config and deserializes the values.
     * 
     * @param config 
     */
    public deserialize(config: IImageLayerToolConfig): void {
        super.deserialize(config);
    }

    /**
     * The method serializes the tool state. Optionally, defaults can be set if property is undefined.
     * 
     * @param defaults
     */
    public serialize(defaults: IImageLayerToolDefaults | undefined): IImageLayerToolConfig {
        const config: IImageLayerToolConfig = <IImageLayerToolConfig> super.serialize(defaults);

        return config;
    }

     /**
     * It returns a base map ID.
     */
      public getUrl(): string {
        return this.url;
    }

    /**
     * It sets a base map ID.
     * 
     * @param baseMap
     */
    public setUrl(url: string): void {
        this.url = url;
    }

    /**
     * It returns a base map ID.
     */
    public getBounds(): LatLngBoundsLiteral {
        return this.bounds;
    }
    
    /**
     * It sets a base map ID.
     * 
     * @param baseMap
     */
    public setBounds(bounds: LatLngBoundsLiteral): void {
        this.bounds = bounds;
    }

    /**
     * It returns a Leaflet image layer.
     */
    public getImageLayer(): L.ImageOverlay | undefined {
        return this.layer;
    }

    /**
     * It sets a Leaflet image layer.
     * 
     * @param layer 
     */
    public setImageLayer(layer: L.ImageOverlay): void {
        this.layer = layer;
    }
}
export default ImageLayerToolState;