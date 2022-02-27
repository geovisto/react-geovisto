import React, { useEffect } from 'react'
import { ITilesLayerToolProps } from '../..';
import { IToolDataProps } from './Types';


export const TilesLayerTool: React.FC<IToolDataProps<ITilesLayerToolProps>> = (props) => {

    useEffect(() => {
      console.log("TilesLayerTool rerender");
    
    }, []);
    



    return <></>;
}