import React from 'react';
import { ISidebarTabProps } from '../..';
import { ENABLED_PROP } from '../Constants';
import { useDidUpdateEffect } from './Hooks';
import { IToolDataProps } from './Types';

// TODO: Export somewhere?
type ISidebarTabDataProps<T> =  IToolDataProps<T> & {
    tool: string
}

export const SidebarTab = (props: ISidebarTabDataProps<ISidebarTabProps>) : JSX.Element => {

    useDidUpdateEffect(() => {
        props.onToolChange?.(props);
    
    }, [props.name,
        props.icon,
        props.checkButton
    ]);

    useDidUpdateEffect(() => {
        props.onToolChange?.(props, ENABLED_PROP);
    
    }, [props.enabled]);
    
    return <></>;
};