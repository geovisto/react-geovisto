// Geovisto
import { ILayerToolDefaults, IMapTilesModel } from "geovisto";

/**
 * This interface declares functions which return the default state values.
 * 
 * @author Jiri Hynek
 */
interface IImageLayerToolDefaults extends ILayerToolDefaults {

    /**
     * It returns the preferred base map.
     */
    getBaseMap(): IMapTilesModel;
}
export default IImageLayerToolDefaults;