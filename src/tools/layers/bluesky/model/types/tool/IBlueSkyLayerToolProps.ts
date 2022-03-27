// Geovisto core
import { LatLngBoundsLiteral } from "leaflet";
import {
    ILayerToolProps
} from "../../../../../../index.core";

/**
 * This type provides the specification of the tiles layer tool props model.
 * 
 * @author Jiri Hynek
 */
type IBlueSkyLayerToolProps = ILayerToolProps & {
    url?: string;
    bounds: LatLngBoundsLiteral;
}
export default IBlueSkyLayerToolProps;