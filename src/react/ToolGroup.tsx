import React, { ReactNode, useEffect, useState } from 'react'
import { GeovistoSidebarTool, GeovistoTilesLayerTool } from '..';
import { Geovisto } from '../index.core';
import { useGeovistoContext } from './context/GeovistoContext';
import { ToolType } from './Tool.types';

interface IToolGroupProps {
    children?: ReactNode
}

export const ToolGroup: React.FC<IToolGroupProps> = ({children}) => {

    const context = useGeovistoContext();

    let toolsX : any[] = [];
    const [tools, setTools] = useState<any>([])

    // const count = React.Children.count(children);
    const childrenWithProps = React.Children.map(children, (child, index) => {
        
        if (React.isValidElement(child)) {
            
            console.log(child.props.id);

            const id = child.props.id;
            const type = child.props.type;

            // TODO: Use reducer
            if(type == ToolType.Selection)
            {

                toolsX.push(GeovistoSidebarTool.createTool({
                    id: id,
                }));
            }
            else if(type == ToolType.LayerMap)
            {
                toolsX.push(GeovistoTilesLayerTool.createTool({
                    id: id
                }));
            }
            
            // if(index == 1)
            // {
            //     setTools(toolsX);
            // }
            //   return React.cloneElement(child, { doSomething });
        }
        return child;
    });
    
    
    useEffect(() => {
        const manager = Geovisto.createMapToolsManager(toolsX);
        context.setTools(manager);
    }, []);

    // children?.valueOf()

    return <>{children}</>;
}