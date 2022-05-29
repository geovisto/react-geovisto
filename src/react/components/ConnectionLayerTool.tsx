// React
import React from 'react';

// Geovisto
import { IConnectionLayerToolProps } from 'geovisto-layer-connection';

// Internal imports
import { useDidToolEnabledUpdate, useDidToolIdUpdate, useToolEffect } from '../Hooks';
import { IToolDataProps } from '../types';

/**
 * Component wrapping the Geovisto ConnectionLayerTool module
 */
export const ConnectionLayerTool = (props: IToolDataProps<IConnectionLayerToolProps>) : JSX.Element => {

    // Run on component mount or any dependency update
    useToolEffect(props, [
        props.icon,
        props.name,
        props.label,
        props.dimensions,
        props.geoData
    ]);
        
    // Run on 'enabled' property update
    useDidToolEnabledUpdate(props, [props.enabled]);

    // Run on 'id' property update
    useDidToolIdUpdate(props, [props.id]);

    return <></>;
};