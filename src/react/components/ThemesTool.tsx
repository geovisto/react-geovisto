import React from 'react';
import { IThemesToolProps } from '../..';
import { useDidToolIdUpdate, useToolEffect } from '../Hooks';
import { IToolDataProps } from '../types/IComponentTool';


export const ThemesTool = (props: IToolDataProps<IThemesToolProps>) : JSX.Element => {

    // Run on component mount or any dependency update
    useToolEffect(props, [
        props.label, 
        props.icon,
        props.enabled,
        props.manager,
        props.theme]);

    // Run on 'id' property update
    useDidToolIdUpdate(props, [props.id]);

    return <></>;
};