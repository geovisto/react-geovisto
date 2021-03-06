// React
import React, { useEffect, useMemo, useState } from 'react';

// Deep-equal
import deepEqual from "deep-equal";

// Geovisto
import { IMapToolProps } from 'geovisto';

// Internal imports
import { useDidToolEnabledUpdate, useDidToolIdUpdate } from '../Hooks';
import { ICustomToolProps, ICustomToolPropsValues } from '../types';

/**
 * Component wrapping users custom modules
 */
export const CustomTool = (props: ICustomToolProps<IMapToolProps>) : JSX.Element => {
    
    const [toolPropsValues, setToolPropsValues] = useState<ICustomToolPropsValues>();

    // Cannot rely on specific props because custom tool can have any props
    const toolValues = useMemo((): ICustomToolPropsValues => {
        
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {id, enabled, onToolChange, createTool, children, ...propsValues} = props;
        return propsValues;

    }, [props]); 

    // Run on component mount or any dependency update (except 'id' & 'enabled' prop)
    useEffect(() => {

        // Emit callback only when props values has changed
        if(!deepEqual(toolPropsValues, toolValues)) {
            
            setToolPropsValues(toolValues);
            props.onToolChange?.(props);
        }

    }, [toolValues]);
    
    // Run on 'enabled' property update
    useDidToolEnabledUpdate(props, [props.enabled]);

    // Run on 'id' property update
    useDidToolIdUpdate(props, [props.id]);
    
    return <>{props.children}</>;
};