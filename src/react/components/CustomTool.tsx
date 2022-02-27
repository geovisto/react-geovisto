import React, {  } from 'react'
import { IToolProps } from './Tool';
import { IToolDataProps } from './Types';


export const CustomTool: React.FC<IToolDataProps<IToolProps>> = (props) => {
    
    return <>{props.children}</>;
}