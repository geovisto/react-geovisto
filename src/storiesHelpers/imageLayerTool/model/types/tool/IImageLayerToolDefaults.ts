// Geovisto
import { ILayerToolDefaults } from "geovisto";

// Leaflet
import { LatLngBoundsLiteral } from "leaflet";

/**
 * This interface declares functions which return the default state values.
 */
interface IImageLayerToolDefaults extends ILayerToolDefaults {

    /**
     * It returns the default image url.
     */
    getUrl(): string;

     /**
     * It returns the default boundaries.
     */
    getBounds(): LatLngBoundsLiteral;
}
export default IImageLayerToolDefaults;