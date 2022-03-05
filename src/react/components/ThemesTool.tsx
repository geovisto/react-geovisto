import React, { useEffect } from 'react'
import { IThemesToolProps, ITilesLayerToolProps } from '../..';
import { IToolDataProps } from './Types';


export const ThemesTool = (props: IToolDataProps<IThemesToolProps>) : JSX.Element => {

    // Run on component mount
    useEffect(() => {
    	props.onToolChange!(props);
    }, []);

    return <></>;
}