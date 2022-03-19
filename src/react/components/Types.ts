import { JSXElementConstructor } from "react";
import { IMap, IMapConfigManager, IMapProps, IMapToolProps } from "../../index.core";

export type IGeovistoMapProps = IMapProps & {
    // ref: RefObject<typeof MyGeovistoMap>,
    children?: React.ReactNode;
    config?: IMapConfigManager;
    className: string;
}

export interface IToolGroupProps {
    children?: React.ReactNode;
    onRenderChange?: (data: unknown) => IMap;
}

export type IToolDataProps<T> = T & {
    children?: React.ReactNode;
    onToolChange?: (data: IToolData, property?: string) => void;
}

// Configuration of the tool component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IToolData = any;

// Common type for component props
type IToolComponentProps = IToolDataProps<IMapToolProps>;

// Common type for all components 
type IToolComponent = ((props: IToolComponentProps) => JSX.Element);

// Common type for all components using useRef hook
type IToolRefComponent = React.ForwardRefExoticComponent<IToolComponentProps>

// All supported types of components
export type ISupportedToolComponent = IToolComponent | IToolRefComponent | IReactElement;

// Default type for React Element (Needed for the comparision with supported components)
export type IReactElement = string | JSXElementConstructor<unknown>;