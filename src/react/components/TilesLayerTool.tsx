import React, { useEffect } from 'react'
import { ITilesLayerToolProps } from '../..';
import { IToolDataProps } from './Types';


export const TilesLayerTool = (props: IToolDataProps<ITilesLayerToolProps>) : JSX.Element => {

    // Run on component mount
    // useEffect(() => {

    //     console.log("Mounted: " + props.id);
    // 	props.onToolChange!(props);
    // }, []);


    useEffect(() => {
        console.log("Updated: " + props.id);
    	props.onToolChange!(props);

    }, [props.enabled])
    

    return <></>;
}