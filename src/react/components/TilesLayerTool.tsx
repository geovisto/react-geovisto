// React
import React from 'react';

// Geovisto
import { ITilesLayerToolProps } from 'geovisto-layer-tiles';

// Internal imports
import { useDidToolEnabledUpdate, useDidToolIdUpdate, useToolEffect } from '../Hooks';
import { IToolDataProps } from '../types/IComponentTool';

/**
 * Component wrapping the Geovisto TilesLayerTool module
 */
export const TilesLayerTool = (props: IToolDataProps<ITilesLayerToolProps>) : JSX.Element => {

    // Run on component mount or any dependency update
    useToolEffect(props, [
        props.label, 
        props.icon, 
        props.name, 
        props.baseMap
    ]);
    
    // Run on 'enabled' property update
    useDidToolEnabledUpdate(props, [props.enabled]);

    // Run on 'id' property update
    useDidToolIdUpdate(props, [props.id]);

    return <></>;
};