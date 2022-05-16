// React
import React from 'react';

// Geovisto
import { ISidebarTabProps } from 'geovisto-sidebar';

// Internal imports
import { useDidUpdateEffect } from '../Hooks';
import { ISidebarTabDataProps } from '../types';

/**
 * Component wrapping the SidebarTab class as part of the SidebarTool module
 */
export const SidebarTab = (props: ISidebarTabDataProps<ISidebarTabProps>) : JSX.Element => {

    // Run on any dependency update
    useDidUpdateEffect(() => {
        props.onToolChange?.(props);
    }, [
        props.id,
        props.name,
        props.icon,
        props.enabled,
        props.checkButton,
        props.fragments,
        props.tool
    ]);

    return <></>;
};