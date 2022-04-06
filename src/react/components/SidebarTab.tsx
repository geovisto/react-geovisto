import React from 'react';
import { ISidebarTabProps } from '../..';
import { useDidUpdateEffect } from '../Hooks';
import { ISidebarTabDataProps } from '../types';


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