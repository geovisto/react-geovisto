import React, { useEffect, useLayoutEffect } from 'react'
import { ITilesLayerToolProps } from '../..';
import { useDidUpdateEffect } from './Hooks';
import { ENABLED_PROP, IToolDataProps } from './Types';


export const TilesLayerTool = (props: IToolDataProps<ITilesLayerToolProps>) : JSX.Element => {

    const {enabled, children, onToolChange, ...propsChanges} = props
    console.error(propsChanges);

    // Run on component mount
    useEffect(() => {
        console.log(props);
        props.onToolChange!(props);
    
    }, [props.id,
        props.name,
        props.label,
        props.baseMap]);
    // TODO and others 
    
    // Run on component update
    useDidUpdateEffect(() => {
        props.onToolChange!(props, ENABLED_PROP);

    },[props.enabled]);

    return <></>;
}