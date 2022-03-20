import React, {  } from 'react';
import { IMapToolProps } from '../../model/types/tool/IMapToolProps';
import { useDidToolEnabledUpdate, useDidToolIdUpdate, useToolEffect } from '../Hooks';
import { IToolDataProps } from '../Types';

export const CustomTool = (props: IToolDataProps<IMapToolProps>) : JSX.Element => {
    
    // Run on component mount or any dependency update
    useToolEffect(props, [
        props.label, 
        props.icon]);
    
    // Run on 'enabled' property update
    useDidToolEnabledUpdate(props, [props.enabled]);

    // Run on 'id' property update
    useDidToolIdUpdate(props, [props.id]);
    
    return <>{props.children}</>;
};