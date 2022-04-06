import { JSXElementConstructor } from "react";
import { IMapToolProps } from "../../index.core";

export type IToolDataProps<T> = T & {
    children?: React.ReactNode;
    onToolChange?: (data: IToolData, property?: string) => void;
}

// Configuration of the tool component
export type IToolData = any;

// Common type for component props
export type IToolComponentProps = IToolDataProps<IMapToolProps>;

// Common type for all components 
type IToolComponent = ((props: IToolComponentProps) => JSX.Element);

// Common type for all components using useRef hook
type IToolRefComponent = React.ForwardRefExoticComponent<IToolComponentProps>

// All supported types of components
export type ISupportedToolComponent = IToolComponent | IToolRefComponent | IReactElement;

// All supported types of components
export type ISupportedTopLevelComponent = React.ForwardRefExoticComponent<any> | IReactElement;

// Default type for React Element (Needed for the comparision with supported components)
export type IReactElement = string | JSXElementConstructor<unknown>;