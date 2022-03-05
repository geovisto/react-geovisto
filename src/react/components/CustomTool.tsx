import React, {  } from 'react'
import { IMapToolProps } from '../../model/types/tool/IMapToolProps';
import { IToolDataProps } from './Types';

export const CustomTool = (props: IToolDataProps<IMapToolProps>) : JSX.Element => {
    
    return <>{props.children}</>;
}