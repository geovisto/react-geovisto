import React, { useEffect } from 'react'
import { ISidebarTabProps } from '../..';
import { useDidUpdateEffect } from './Hooks';
import { ENABLED_PROP, IToolDataProps } from './Types';

type ISidebarTabDataProps<T> =  IToolDataProps<T> & {
    tool: string
}

export const SidebarTab = (props: ISidebarTabDataProps<ISidebarTabProps>) : JSX.Element => {

    useDidUpdateEffect(() => {
        console.log('change');
        props.onToolChange!(props);
    
    }, [props.name,
        props.icon,
        props.checkButton
    ]);

    useDidUpdateEffect(() => {
        console.log('Enable change');
        props.onToolChange!(props, ENABLED_PROP);
    
    }, [props.enabled]);
    
    return <></>
}