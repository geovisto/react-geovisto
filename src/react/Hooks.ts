import React, { useEffect, useRef, useState } from "react";
import { ENABLED_PROP, ID_PROP } from "./Constants";
import { validateId } from "./Helpers";
import { IToolComponentProps } from "./Types";
import deepEqual from "deep-equal";

/**
 * Reacts to dependencies change once the component is mounted
 * Equivalent to componentDidUpdate function in 'class components' schema
 */
export const useDidUpdateEffect = (func: () => void, dependencies?: React.DependencyList): void => {
    
    const didMount = useRef(false);

    useEffect(() => {

        if (didMount.current) {
            func();
        } 
        else {
            didMount.current = true;
        }
    }, dependencies ?? []);
};

/**
 * Default behavior for component properties
 * Emits onToolChange callback on component mount or any dependency update
 */
export const useToolEffect = <TProps extends IToolComponentProps>(props: TProps, dependencies? : React.DependencyList) : void => {
    
    useEffect(() => {

        props.onToolChange?.(props);

    }, dependencies ?? []);
};

/**
 * Reacts to 'enabled' property changes
 */
export const useDidToolEnabledUpdate = <TProps extends IToolComponentProps = IToolComponentProps>(props: TProps, dependencies? : React.DependencyList): void => {
    
    useDidUpdateEffect(() => {

        props.onToolChange?.(props, ENABLED_PROP);

    }, dependencies ?? []);
};

/**
 * Reacts to tool identificator changes while providing validation and keeping the previous value
 */
export const useDidToolIdUpdate = <TProps extends IToolComponentProps = IToolComponentProps>(props: TProps, dependencies? : React.DependencyList): void => {
    
    // Keep previous id so the obsolete tool can be removed once the id changes
    const [id, setId] = useState<string>();
    
    useEffect(() => {
        validateId(props.id);
        
        if(id !== undefined) {
            
            console.error(`Previous id: ${id}\nNew id: ${props.id}`);
            props.onToolChange?.({prevId: id, ...props}, ID_PROP);        
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        setId(props.id!);

    }, dependencies ?? []);
};

/**
 * Reacts to tool identificator changes while providing validation and keeping the previous value
 */
 export const useDidToolManagerUpdate = <TManager, TProps extends IToolComponentProps & {manager?: TManager} = IToolComponentProps>(props: TProps, dependencies? : React.DependencyList): void => {
    
    const [manager, setManager] = useState<TManager>();
    
    useEffect(() => {
        
        if(manager !== undefined) {

            // Emit callback only if previous and current version of the manager differs
            if(!deepEqual(manager, props.manager)) {
                props.onToolChange?.(props);               
            }            
        }
        setManager(props.manager);

    }, dependencies ?? []);
};