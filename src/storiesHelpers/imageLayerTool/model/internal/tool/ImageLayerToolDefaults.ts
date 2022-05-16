// Geovisto
import { LayerToolDefaults } from "geovisto";

// Leaflet
import { LatLngBoundsLiteral } from "leaflet";

import IImageLayerToolDefaults from "../../types/tool/IImageLayerToolDefaults";

/**
 * This class provide functions which return the default state values.
 */
class ImageLayerToolDefaults extends LayerToolDefaults implements IImageLayerToolDefaults {

    /**
     * Static tool type constant.
     */
    public static TYPE = "geovisto-tool-layer-image";

    /**
     * It returns a unique type string of the tool which is based on the layer it wraps.
     */
    public getType(): string {
        return ImageLayerToolDefaults.TYPE;
    }

    /**
     * It returns the layer name.
     */
    public getLayerName(): string {
        return "Image layer";
    }

    /**
     * It returns the label of the tool.
     */
    public getLabel(): string {
        return this.getLayerName();
    }

    /**
     * It returns the icon of the tool.
     */
    public getIcon(): string {
        return '<i class="fa fa-image"></i>';
    }

    /**
     * It returns the default image url.
     */
    public getUrl(): string {
        return 'https://cdn.mos.cms.futurecdn.net/mZb3Q79jgPAXAcag7CutLW-970-80.jpg.webp';
    }

    /**
     * It returns the default boundaries.
     */
    public getBounds(): LatLngBoundsLiteral {
        return [[50.61234612962773, 36.80436286581505], [75.9832318764685, 139.0663053092597]];   
    }
}
export default ImageLayerToolDefaults;