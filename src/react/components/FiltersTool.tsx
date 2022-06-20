// React
import React from 'react';

// Geovisto
import { IFiltersToolProps } from 'geovisto-filters';

// Internal imports
import { useDidToolEnabledUpdate, useDidToolIdUpdate, useToolEffect } from '../Hooks';
import { IToolDataProps } from '../types';

/**
 * Component wrapping the Geovisto FiltersTool module
 */
export const FiltersTool = (props: IToolDataProps<IFiltersToolProps>) : JSX.Element => {

    // Run on component mount or any dependency update
    useToolEffect(props, [
        props.icon,
        props.label,
        props.rules,
        props.manager
    ]);
        
    // Run on 'enabled' property update
    useDidToolEnabledUpdate(props, [props.enabled]);

    // Run on 'id' property update
    useDidToolIdUpdate(props, [props.id]);

    return <></>;
};