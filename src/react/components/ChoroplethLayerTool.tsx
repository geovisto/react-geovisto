import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { IChoroplethLayerToolProps } from '../..';
import { useDidUpdateEffect } from './Hooks';
import { ENABLED_PROP, IToolDataProps } from './Types';

export const ChoroplethLayerTool = (props: IToolDataProps<IChoroplethLayerToolProps>) : JSX.Element => {

    // Run on component mount
    useEffect(() => {
        props.onToolChange!(props);
    
    }, [props.icon,
        props.name,
        props.label,
        props.dimensions,
        props.geoData]);
    // TODO and others 

    // Run on component update
    useDidUpdateEffect(() => {
        props.onToolChange!(props, ENABLED_PROP);

    },[props.enabled]);



    return <></>;
}