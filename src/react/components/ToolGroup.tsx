import React, { ReactElement, ReactNode, useEffect } from 'react'
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

    switch (child.type) {
        case SidebarTool:
            
            // console.log(child.props.data.tabs)
            var sidebarToolConfig = {...props, tabs: props.data.tabs};

            return GeovistoSidebarTool.createTool(sidebarToolConfig);
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


    const handleToolChange = (toolProps: any) => {

        console.log("This tool called change: " + toolProps.id);
        
        // TODO How to process the change?     
        const reactTool = childrenCopy?.find(el => el.props.id === toolProps.id);
        
        if(React.isValidElement(reactTool))
        {
            
            const manager = (context.tools as IMapToolsManager);

            

            manager?.removeById(toolProps.id);
            
            let tool = processTool(reactTool);
            
            manager?.add(tool!);
            


            context.setTools(manager!);
            
            props.onRenderChange!(manager);


            // const tools = React.Children.map(childrenCopy, (child, index) => {
        
            //     if (React.isValidElement(child)) {
    
            //         // TODO: Use reducer
            //         return processTool(child);
            //     }
            // });
    
            // const manager = Geovisto.createMapToolsManager(tools!);
            
            // console.log(manager.);
            // context.setTools(undefined);
            // context.setTools(manager!);
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
    
            newProps.data = {};



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