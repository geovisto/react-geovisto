import React, { useEffect } from 'react'
import { IChoroplethLayerToolProps } from '../..';
import { IToolDataProps } from './Types';

export const ChoroplethLayerTool = (props: IToolDataProps<IChoroplethLayerToolProps>) : JSX.Element => {

    // Run on component mount
    useEffect(() => {
        props.onToolChange!(props);
    }, []);

    return <></>;
}