import React, { useEffect } from 'react';
import { IMarkerLayerToolProps } from '../..';
import { ENABLED_PROP } from '../Constants';
import { useDidUpdateEffect } from './Hooks';
import { IToolDataProps } from './Types';

export const MarkerLayerTool = (props: IToolDataProps<IMarkerLayerToolProps>) : JSX.Element => {

    // Run on component mount
    useEffect(() => {
        props.onToolChange?.({...props});
    
    }, [props.id,
        props.name,
        props.icon,
        props.label,
        props.dimensions,
        props.geoData]);

    // Run on component update
    useDidUpdateEffect(() => {
        props.onToolChange?.(props, ENABLED_PROP);

    },[props.enabled]);


    return <></>;
};