// Geovisto
import { ILayerToolProps } from "geovisto";

// Leaflet
import { LatLngBoundsLiteral } from "leaflet";

/**
 * This type provides the specification of the tiles layer tool props model.
 * 
 * @author Jiri Hynek
 */
type IImageLayerToolProps = ILayerToolProps & {
    url: string;
    bounds: LatLngBoundsLiteral;
}
export default IImageLayerToolProps;