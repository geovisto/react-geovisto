// Geovisto core
import {
    ILayerToolProps,
    IMapTilesModel
} from "../../../../../../index.core";

/**
 * This type provides the specification of the tiles layer tool props model.
 * 
 * @author Jiri Hynek
 */
type IBlueSkyLayerToolProps = ILayerToolProps & {
    url?: string;
}
export default IBlueSkyLayerToolProps;