import React, {  } from 'react'
import { IMapToolProps } from '../../model/types/tool/IMapToolProps';
import { IToolDataProps } from './Types';

export const CustomTool: React.FC<IToolDataProps<IMapToolProps>> = (props) => {
    
    return <>{props.children}</>;
}