// Geovisto
import { IMap, IMapTool } from "geovisto";

// Default Tool group component props
export type IToolGroupProps = {
    children?: React.ReactNode;
    onRenderChange?: (data: unknown) => IMap;
}

// Handle ref calls from parent
export type IToolGroupHandle = {
    rerenderTools: () => void;
}

// Represents information about current tool before its update 
export type IToolInfo = {
    id: string,
    data: IMapTool,
    isLayerTool: boolean
}