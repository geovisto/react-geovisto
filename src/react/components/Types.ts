import { IMapConfigManager, IMapProps } from "../../index.core"

export type IGeovistoMapProps = IMapProps & {
    // ref: RefObject<typeof MyGeovistoMap>,
    config?: IMapConfigManager;
    className: string;
}

export type IToolDataProps<T> = T & {
    // data? : any;
    onToolChange?: (data: [string | React.JSXElementConstructor<any>, any]) => never;
}

// export type IToolProps<T> = T & {
//     callback?: () => never; 
// }