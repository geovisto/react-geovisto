import { IMapConfigManager, IMapProps } from "../../index.core";

// Default Geovisto Map component props
export type IGeovistoMapProps = IMapProps & {
    children?: React.ReactNode;
    config?: IMapConfigManager;
    className: string;
}