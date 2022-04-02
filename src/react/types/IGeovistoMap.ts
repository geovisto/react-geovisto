import { IMap, IMapConfigManager, IMapProps } from "../../index.core";

// Default Geovisto Map component props
export type IGeovistoMapProps = IMapProps & {
    children?: React.ReactNode;
    config?: IMapConfigManager;
    className: string;
}

// Handle ref calls from parent
export type IGeovistoMapHandle =  {
    getMap: () => IMap | undefined
}