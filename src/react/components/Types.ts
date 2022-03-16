import { IMap, IMapConfigManager, IMapProps } from "../../index.core"

export const ENABLED_PROP = 'enabled';

export type IGeovistoMapProps = IMapProps & {
    // ref: RefObject<typeof MyGeovistoMap>,
    children?: React.ReactNode;
    config?: IMapConfigManager;
    className: string;
}

export interface IToolGroupProps {
    children?: React.ReactNode;
    onRenderChange?: (data: any) => IMap;//IMapToolsManager | undefined;
}

export type IToolDataProps<T> = T & {
    // data? : any;
    children?: React.ReactNode;
    onToolChange?: (data: IToolData, property?: string) => void;
}

export type IToolData = any;

// TODO: Sjednodit s IReactElement v Constants
export type IToolType = string | React.JSXElementConstructor<any>;

