import IBlueSkyLayerTool from "./model/types/tool/IBlueSkyLayerTool";
import IBlueSkyLayerToolProps from "./model/types/tool/IBlueSkyLayerToolProps";
import BlueSkyLayerTool from "./model/internal/tool/BlueSkyLayerTool";
import BlueSkyLayerToolDefaults from "./model/internal/tool/BlueSkyLayerToolDefaults";

export const GeovistoBlueSkyLayerTool: {
    getType: () => string,
    createTool: (props?: IBlueSkyLayerToolProps) => IBlueSkyLayerTool
} = {
    getType: () => BlueSkyLayerToolDefaults.TYPE,
    createTool: (props) => new BlueSkyLayerTool(props),
};