import React, { useEffect, useRef, useState } from 'react';
import { ITilesLayerToolProps } from '../..';
import { ENABLED_PROP, ID_PROP } from '../Constants';
import { useDidUpdateEffect } from './Hooks';
import { IToolDataProps } from './Types';


export const TilesLayerTool = (props: IToolDataProps<ITilesLayerToolProps>) : JSX.Element => {

    const {enabled, children, onToolChange, ...propsChanges} = props;
    // console.error(propsChanges);

    const [id, setId] = useState<string>();

    // Run on component mount
    useEffect(() => {
        // console.log(props);
        props.onToolChange?.(props);
        setId(props.id);
    
    }, [props.name,
        props.label,
        props.baseMap]);
    // TODO: and others 
    
    // Run on component update
    useDidUpdateEffect(() => {
        props.onToolChange?.(props, ENABLED_PROP);

    },[props.enabled]);

    // Run on component update
    useDidUpdateEffect(() => {
        console.log("ID CHANGED");
        console.log(id);
        console.log(props.id);

        props.onToolChange?.({prevId: id, ...props}, ID_PROP);
        
        setId(props.id);

    },[props.id]);

    return <></>;
};