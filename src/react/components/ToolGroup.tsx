import React, { ReactElement, ReactNode, useEffect } from 'react'
import { ChoroplethLayerTool, MarkerLayerTool, SidebarTool, ThemesTool, TilesLayerTool } from '.';
import { GeovistoChoroplethLayerTool, GeovistoMarkerLayerTool, GeovistoSidebarTool, GeovistoThemesTool, GeovistoTilesLayerTool } from '../..';
import { Geovisto } from '../../index.core';
import { useGeovistoContext } from '../context/GeovistoContext';

interface IToolGroupProps {
    children?: ReactNode
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

export const ToolGroup: React.FC<IToolGroupProps> = ({children}) => {

    const context = useGeovistoContext();

    // // const count = React.Children.count(children);
    // const tools = React.Children.map(children, (child, index) => {
        
    //     if (React.isValidElement(child)) {

    //         // TODO: Use reducer

    //         console.log("someTool");
    //         switch (child.type) {
    //             case SidebarTool:
                    
                    
    //                 // console.log(child);
    //                 // return GeovistoSidebarTool.createTool({
    //                     //     id: SIDEBAR_ID,
    //                 //     tabs: [
    
    //                     //         [TILES_ID, 
    //                     //             new SidebarTab({
    //                         //                 enabled: true,
    //                         //                 name: "[CUSTOM] Map layer settings",
    //                 //                 icon: "<i class=\"fa fa-eur\"></i>",
    //                 //                 checkButton: false
    //                 //             })
    //                 //         ],
    //                 //         [CHOROPLETH_ID, 
    //                 //             new SidebarTab({
    //                 //                 enabled: true,
    //                 //                 name: "[CUSTOM] Choropleth layer settings",
    //                 //                 icon: "<i class=\"fa fa-usd\"></i>",
    //                 //                 checkButton: true
    //                 //             })
    //                 //         ],
    //                 //     ]
    //                 // });
    //                 // console.log(context.sidebar);
    //                 return GeovistoSidebarTool.createTool(context.sidebar);
    //                 // return GeovistoSidebarTool.createTool(child.props);

    //             case TilesLayerTool:
    //                 return GeovistoTilesLayerTool.createTool(child.props);
    //             case ChoroplethLayerTool:
    //                 return GeovistoChoroplethLayerTool.createTool(child.props);
    //             case MarkerLayerTool:
    //                 return GeovistoMarkerLayerTool.createTool(child.props);    
    //             default:
    //                 return;
    //         }
    //     }
    // });
    
    const childrenCopy = React.Children.map(children, (child, index) => {
    
        if (!React.isValidElement(child))
        {
            return;
        } 
            
        if(child.type == SidebarTool)
        {
            let newProps = {...child.props};
    
            newProps.data = {};

            return React.cloneElement(child, newProps, child.props.children);
        }

        return child;
    });
  
    
    // useEffect(() => {
    //     console.log("ToolGroup");   
      
    //   }, []);

    useEffect(() => {
        
        // console.log(children);
        // console.log(tools);
        // const count = React.Children.count(children);
        const tools = React.Children.map(childrenCopy, (child, index) => {
        
        if (React.isValidElement(child)) {

            // TODO: Use reducer
            return processTool(child);
        }
        });

        const manager = Geovisto.createMapToolsManager(tools!);
        context.setTools(manager);
        console.log("[ToolGroup] Rendered");
    // }, [context.sidebar]);
    }, []);

    useEffect(() => {

        const tools = React.Children.map(childrenCopy, (child, index) => {
        
        if (React.isValidElement(child)) {

            // TODO: Use reducer
            return processTool(child);
        }
        });

    }, [childrenCopy]);
    



    return <>{childrenCopy}</>;
}