// Geovisto
import { IMap, IMapConfigManager, IMapProps } from "geovisto";

// Default Geovisto Map component props
export type IGeovistoMapProps = IMapProps & {
    children?: React.ReactNode;
    config?: IMapConfigManager;
    id: string;
    className: string;
}

// Handle ref calls from parent
export type IGeovistoMapHandle =  {
    getMap: () => IMap | undefined
}