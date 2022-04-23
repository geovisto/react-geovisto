import { IMapToolProps } from "geovisto";

import { IToolDataProps } from "./IComponentTool";

// Default type of a user-specified custom geovisto tool 
export type ICustomToolProps<T> = IToolDataProps<T> & any & {
    createTool: (props: unknown) => unknown
};

// User-specified props changes that should component react to
export type ICustomToolPropsValues = Omit<ICustomToolProps<IMapToolProps>, 
        'id' | 'enabled' | 'createTool' | 'onToolChange' | 'children' >;

