import React, { ReactElement, ReactNode, useEffect, useState } from 'react'
import { ChoroplethLayerTool, MarkerLayerTool, SidebarTool, ThemesTool, TilesLayerTool } from '.';
import { GeovistoChoroplethLayerTool, GeovistoMarkerLayerTool, GeovistoSidebarTool, GeovistoThemesTool, GeovistoTilesLayerTool, IMapToolsManager, } from '../..';
import { Geovisto } from '../../index.core';
import { CHOROPLETH_ID, SIDEBAR_ID, TILES_ID } from '../Constants';
import { useGeovistoContext } from '../context/GeovistoContext';
import { CustomTool } from './CustomTool';

interface IToolGroupProps {
    children?: ReactNode
    onRenderChange?: (data: any) => never;
}

const processTool = (child : ReactElement) => {
    
    const props = child.props;

    // (property) React.ReactElement<any, string | React.JSXElementConstructor<any>>.type: string | React.JSXElementConstructor<any>

    switch (child.type) {
        case SidebarTool:
            
            // console.log(child.props.data.tabs)
            // var sidebarToolConfig = {...props};

            return GeovistoSidebarTool.createTool(props);
            // return GeovistoSidebarTool.createTool(child.props);

        case TilesLayerTool:
            return GeovistoTilesLayerTool.createTool(props);
        case ChoroplethLayerTool:
            return GeovistoChoroplethLayerTool.createTool(props);
        case MarkerLayerTool:
            return GeovistoMarkerLayerTool.createTool(props);    
        case ThemesTool:
            return GeovistoThemesTool.createTool(props);
        default:
            return;
    }
}

export const ToolGroup: React.FC<IToolGroupProps> = (props) => {

    const context = useGeovistoContext();
    const [counter, setCounter] = useState(0);
    const [manager, setManager] = useState<IMapToolsManager | undefined>(Geovisto.createMapToolsManager([]));

    const handleToolChange = (toolProps: any) => {

        console.log("This tool called change: " + toolProps.id);
        
        setCounter(counter + 1);

        // TODO How to process the change?     
        const reactTool = childrenCopy?.find(el => el.props.id === toolProps.id);
        
        if(counter <= React.Children.count(props.children))
        {  
            console.log(counter); 

            if(React.isValidElement(reactTool))
            {
                const manager = (context.tools as IMapToolsManager);
                                
                let tool = processTool(reactTool);
                
                // manager?.removeById(toolProps.id);
                manager?.add(tool!);
    
                context.setTools(manager!);
                
                props.onRenderChange!(manager);
            }

            if(counter === React.Children.count(props.children))
            {
                console.log("All tools processed");
                props.onRenderChange!(manager);

            }
            else
            {
                console.log("skipping (counter: " + counter + ")");
            }

        }
        else
        {
            console.log("Should be updating");
    
            // manager?.removeById(toolProps.id);
            
            // let tool = processTool(reactTool);
            
            // manager?.add(tool!);

            // context.setTools(manager!);
            
            // props.onRenderChange!(manager);
        }


        // console.log(childrenCopy)

    };


    const childrenCopy = React.Children.map(props.children, (child, index) => {
    
        if (!React.isValidElement(child))
        {
            return;
        } 
            
        // if(child.type != CustomTool)
        // {
            let newProps = {...child.props};
    
            newProps.onToolChange = handleToolChange

            return React.cloneElement(child, newProps, child.props.children);
        // }
        // return child;
    });
  
    

    // Initial rendering
    useEffect(() => {
        
        const tools = React.Children.map(childrenCopy, (child, index) => {
        
            if (React.isValidElement(child)) {
                return processTool(child);
            }
        });

        const manager = Geovisto.createMapToolsManager(tools!);
        context.setTools(manager);

        console.log("[ToolGroup] Rendered");
    }, []);


        



    return <>{childrenCopy}</>;
}