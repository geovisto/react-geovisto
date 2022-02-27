import React from 'react'
import { ISidebarTabProps } from '../..';
import { IToolDataProps } from './Types';

type ISidebarTabDataProps<T> =  IToolDataProps<T> & {
    tool: string
}

export const SidebarTab: React.FC<ISidebarTabDataProps<ISidebarTabProps>> = ({}) => null