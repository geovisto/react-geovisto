import React, { useEffect } from 'react'
import { ITilesLayerToolProps } from '../..';
import { IToolDataProps } from './Types';


export const TilesLayerTool: React.FC<IToolDataProps<ITilesLayerToolProps>> = (props) => {

    useEffect(() => {
    	props.onToolChange!(props);
		// console.log(props.id);


	// TODO: How to make it on all properties?
    }, [props.enabled]);
    



    return <></>;
}