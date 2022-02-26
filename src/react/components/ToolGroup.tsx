import React, { ReactElement, ReactNode, useEffect, useState } from 'react'
import { ChoroplethLayerTool, MarkerLayerTool, SidebarTool, TilesLayerTool } from '.';
import { GeovistoChoroplethLayerTool, GeovistoMarkerLayerTool, GeovistoSidebarTool, GeovistoTilesLayerTool, SidebarTab } from '../..';
import { Geovisto } from '../../index.core';
import { CHOROPLETH_ID, SIDEBAR_ID, TILES_ID } from '../Constants';
import { useGeovistoContext } from '../context/GeovistoContext';
import { ToolType } from './Tool.types';

interface IToolGroupProps {
    children?: ReactNode
}

const getTool = (child : ReactElement) => {
    
    switch (child.type) {
        case SidebarTool:
            return GeovistoSidebarTool.createTool(child.props);
        case TilesLayerTool:
            return GeovistoTilesLayerTool.createTool(child.props);
        case ChoroplethLayerTool:
            return GeovistoChoroplethLayerTool.createTool(child.props);
        case MarkerLayerTool:
            return GeovistoMarkerLayerTool.createTool(child.props);    
        default:
            return;
    } 
}

export const ToolGroup: React.FC<IToolGroupProps> = ({children}) => {

    const context = useGeovistoContext();

    // const count = React.Children.count(children);
    const tools = React.Children.map(children, (child, index) => {
        
        if (React.isValidElement(child)) {

            // TODO: Use reducer

            
            switch (child.type) {
                case SidebarTool:
                    
                    
                    // console.log(child);
                    // return GeovistoSidebarTool.createTool({
                        //     id: SIDEBAR_ID,
                    //     tabs: [
    
                        //         [TILES_ID, 
                        //             new SidebarTab({
                            //                 enabled: true,
                            //                 name: "[CUSTOM] Map layer settings",
                    //                 icon: "<i class=\"fa fa-eur\"></i>",
                    //                 checkButton: false
                    //             })
                    //         ],
                    //         [CHOROPLETH_ID, 
                    //             new SidebarTab({
                    //                 enabled: true,
                    //                 name: "[CUSTOM] Choropleth layer settings",
                    //                 icon: "<i class=\"fa fa-usd\"></i>",
                    //                 checkButton: true
                    //             })
                    //         ],
                    //     ]
                    // });
                    console.log(context.sidebar);
                    return GeovistoSidebarTool.createTool(context.sidebar);
                    // return GeovistoSidebarTool.createTool(child.props);

                case TilesLayerTool:
                    return GeovistoTilesLayerTool.createTool(child.props);
                case ChoroplethLayerTool:
                    return GeovistoChoroplethLayerTool.createTool(child.props);
                case MarkerLayerTool:
                    return GeovistoMarkerLayerTool.createTool(child.props);    
                default:
                    return;
            }
        }
    });
    
    
    useEffect(() => {
        console.log(tools);

        const manager = Geovisto.createMapToolsManager(tools!);
        context.setTools(manager);
        console.log("[ToolGroup] Rendered");
    }, [context.sidebar]);


    return <>{children}</>;
}