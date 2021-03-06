// React
import React from 'react';

// Geovisto
import { IThemesToolProps } from 'geovisto-themes';

// Internal imports
import { useDidToolEnabledUpdate, useDidToolIdUpdate, useToolEffect } from '../Hooks';
import { IToolDataProps } from '../types/IComponentTool';

/**
 * Component wrapping the Geovisto ThemesTool module
 */
export const ThemesTool = (props: IToolDataProps<IThemesToolProps>) : JSX.Element => {

    // Run on component mount or any dependency update
    useToolEffect(props, [
        props.label, 
        props.icon,
        props.manager,
        props.theme
    ]);

    // Run on 'enabled' property update
    useDidToolEnabledUpdate(props, [props.enabled]);

    // Run on 'id' property update
    useDidToolIdUpdate(props, [props.id]);

    return <></>;
};