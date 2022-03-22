import React from 'react';
import { IThemesToolProps } from '../..';
import { IMapThemesManager } from '../../tools';
import { useDidToolIdUpdate, useDidToolManagerUpdate, useToolEffect } from '../Hooks';
import { IToolDataProps } from '../Types';


export const ThemesTool = (props: IToolDataProps<IThemesToolProps>) : JSX.Element => {

    // Run on component mount or any dependency update
    useToolEffect(props, [
        props.label, 
        props.icon,
        props.enabled,
        props.theme]);

    // Run on 'manager' property update
    useDidToolManagerUpdate<IMapThemesManager>(props, [props.manager]);
    
    // Run on 'id' property update
    useDidToolIdUpdate(props, [props.id]);

    return <></>;
};