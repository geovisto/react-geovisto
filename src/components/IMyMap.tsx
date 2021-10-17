// React
import {
    RefObject
} from "react";

// Geovisto
import { IMapConfigManager, IMapProps } from "geovisto";

import ReactGeovistoMap from "./ReactGeovistoMap";

/**
 * This type provides the specification of the map props model.
 * 
 * @author Jiri Hynek
 */
type IMyMap = IMapProps & {
    ref: RefObject<ReactGeovistoMap>,
    config?: IMapConfigManager
}
export default IMyMap;