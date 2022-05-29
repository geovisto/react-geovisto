// Geovisto
import { ILayerToolProps } from "geovisto";

// Leaflet
import { LatLngBoundsLiteral } from "leaflet";

/**
 * This type provides the specification of the image layer tool props model.
 */
type IImageLayerToolProps = ILayerToolProps & {
    url: string;
    bounds: LatLngBoundsLiteral;
}
export default IImageLayerToolProps;