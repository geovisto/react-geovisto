// React
import React from 'react';

// Geovisto
import { IMarkerLayerToolProps } from 'geovisto-layer-marker';

// Internal imports
import { useDidToolEnabledUpdate, useDidToolIdUpdate, useToolEffect } from '../Hooks';
import { IToolDataProps } from '../types/IComponentTool';

export const MarkerLayerTool = (props: IToolDataProps<IMarkerLayerToolProps>) : JSX.Element => {
    
    // Run on component mount or any dependency update
    useToolEffect(props, [
        props.label, 
        props.icon, 
        props.name, 
        props.dimensions,
        props.geoData
    ]);
    
    // Run on 'enabled' property update
    useDidToolEnabledUpdate(props, [props.enabled]);

    // Run on 'id' property update
    useDidToolIdUpdate(props, [props.id]);

    return <></>;
};