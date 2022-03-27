import React, { useEffect } from 'react';
import { IMapToolProps } from '../../model/types/tool/IMapToolProps';
import { useDidToolEnabledUpdate, useDidToolIdUpdate, useToolEffect } from '../Hooks';
import { IToolDataProps } from '../Types';

// TODO: Export somewhere?
type ICustomToolProps<T> = IToolDataProps<T> & any & {
    createTool: (props: unknown) => unknown
};

export const CustomTool = (props: ICustomToolProps<IMapToolProps>) : JSX.Element => {
    
    // TODO: React on all passed props with this tool
    // FIXME: This is important
    // FIXME: okay?
    // maybe just Useffect without dependency?

    // useEffect(() => {
    //   console.log('something changed')
    
    // });
    

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