import React from 'react'
import { ISidebarTab, ISidebarTabProps } from '../..';

export interface ISidebarTabPropsExtended extends ISidebarTabProps {
    tool: string
}

export const SidebarTab: React.FC<ISidebarTabPropsExtended> = ({}) => null