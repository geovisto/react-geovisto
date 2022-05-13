// Leaflet
import { LatLngBoundsLiteral } from "leaflet";

// Geovisto
import {
    LayerToolState,
    IMapToolInitProps,
} from "geovisto";

import IImageLayerToolState from "../../types/tool/IImageLayerToolState";
import IImageLayerTool from "../../types/tool/IImageLayerTool";
import IImageLayerToolProps from "../../types/tool/IImageLayerToolProps";
import IImageLayerToolDefaults from "../../types/tool/IImageLayerToolDefaults";
import IImageLayerToolConfig from "../../types/tool/IImageLayerToolConfig";


/**
 * This class provide functions for using the state of the tiles layer tool.
 * 
 * @author Jiri Hynek
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
        // the map layer tool properties
        // this.setBaseMap(props.baseMap == undefined ? defaults.getBaseMap() : props.baseMap);

        this.setUrl(props.url == undefined ? 'https://cdn.mos.cms.futurecdn.net/mZb3Q79jgPAXAcag7CutLW-970-80.jpg.webp' : props.url);
        this.setBounds(props.bounds == undefined ? [[-81.00145417371247, -66.30666147868511], [-36.863192079346526, 50.1016129498304]] : props.bounds);

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

        // the map layer tool config
        // TODO
    }

    /**
     * The method serializes the tool state. Optionally, defaults can be set if property is undefined.
     * 
     * @param defaults
     */
    public serialize(defaults: IImageLayerToolDefaults | undefined): IImageLayerToolConfig {
        const config: IImageLayerToolConfig = <IImageLayerToolConfig> super.serialize(defaults);

        // serialize the map layer tool properties
        // TODO

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
     * It returns a Leaflet tile layer.
     */
    public getImageLayer(): L.ImageOverlay | undefined {
        return this.layer;
    }

    /**
     * It sets a Leaflet tile layer.
     * 
     * @param layer 
     */
    public setImageLayer(layer: L.ImageOverlay): void {
        this.layer = layer;
    }
}
export default ImageLayerToolState;