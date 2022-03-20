import React from 'react';
import { IChoroplethLayerToolProps } from '../..';
import { useDidToolEnabledUpdate, useDidToolIdUpdate, useToolEffect } from '../Hooks';
import { IToolDataProps } from '../Types';

export const ChoroplethLayerTool = (props: IToolDataProps<IChoroplethLayerToolProps>) : JSX.Element => {

    // Run on component mount or any dependency update
    useToolEffect(props, [
        props.icon,
        props.name,
        props.label,
        props.dimensions,
        props.geoData]);
        
    // Run on 'enabled' property update
    useDidToolEnabledUpdate(props, [props.enabled]);

    // Run on 'id' property update
    useDidToolIdUpdate(props, [props.id]);

    return <></>;
};