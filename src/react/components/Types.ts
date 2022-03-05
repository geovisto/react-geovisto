import { ReactElement } from "react";
import { IMapConfigManager, IMapProps } from "../../index.core"

export type IGeovistoMapProps = IMapProps & {
    // ref: RefObject<typeof MyGeovistoMap>,
    config?: IMapConfigManager;
    className: string;
}

export interface IToolGroupProps {
    children?: React.ReactNode;
    onRenderChange?: (data: any) => never;
}

export type IToolDataProps<T> = T & {
    // data? : any;
    onToolChange?: (data: IToolData) => never;
    children?: React.ReactNode;
}

// export type IToolData = [string | React.JSXElementConstructor<any>, any];

export type IToolData = any;

export type IToolType = string | React.JSXElementConstructor<any>;

