import React, { useEffect } from 'react'
import { IMarkerLayerToolProps } from '../..';
import { IToolDataProps } from './Types';

export const MarkerLayerTool = (props: IToolDataProps<IMarkerLayerToolProps>) : JSX.Element => {

    // Run on component mount
    useEffect(() => {
    	props.onToolChange!(props);
    }, []);

    return <></>;
}