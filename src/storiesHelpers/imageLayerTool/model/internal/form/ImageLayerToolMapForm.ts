// Geovisto
import { ILayerToolDimensions, IMapForm, MapLayerToolForm } from "geovisto";

import IImageLayerTool from "../../types/tool/IImageLayerTool";

/**
 * This class provides functions for management of the layer sidebar tab.
 */
class ImageLayerToolMapForm extends MapLayerToolForm<IImageLayerTool> implements IMapForm {

    /**
     * It creates new map form with respect to the given props.
     * 
     * @param tool 
     */
    public constructor(tool: IImageLayerTool) {
        super(tool);
    }

    /**
     * It updates selected input values according to the given dimensions.
     * 
     * @param dimensions 
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public setInputValues(dimensions: ILayerToolDimensions): void {
        return;
    }

    /**
     * It returns tab pane which will be placed in sidebar tab.
     */
    public getContent(): HTMLDivElement {
        return document.createElement("div");
    }
}
export default ImageLayerToolMapForm;