import React, { Children, ReactElement, ReactNode, useEffect, useState } from 'react'
import { ChoroplethLayerTool, MarkerLayerTool, SidebarTool, ThemesTool, TilesLayerTool } from '.';
import { GeovistoChoroplethLayerTool, GeovistoMarkerLayerTool, GeovistoSidebarTool, 
         GeovistoThemesTool, GeovistoTilesLayerTool, IChoroplethLayerTool, IMapToolsManager, 
         ITilesLayerTool, LayerToolRenderType, } from '../..';
import { Geovisto } from '../../index.core';
import { useGeovistoContext } from '../context/GeovistoContext';
import { CustomTool } from './CustomTool';
import { IToolData, IToolGroupProps, IToolType } from './Types';


// const processTool = ([toolType, toolProps] : IToolData) => {
const processTool = (toolType: IToolType, toolData: IToolData) => {
    

    // (property) React.ReactElement<any, string | React.JSXElementConstructor<any>>.type: string | React.JSXElementConstructor<any>

    switch (toolType) {
        case SidebarTool:
            return GeovistoSidebarTool.createTool(toolData);
        case TilesLayerTool:
            return GeovistoTilesLayerTool.createTool(toolData);
        case ChoroplethLayerTool:
            return GeovistoChoroplethLayerTool.createTool(toolData);
        case MarkerLayerTool:
            return GeovistoMarkerLayerTool.createTool(toolData);    
        case ThemesTool:
            return GeovistoThemesTool.createTool(toolData);
        case CustomTool:
            return null //TODO: Change this to return some function
        default:
            return;
    }
}

export const ToolGroup = (props: IToolGroupProps) : JSX.Element => {

    const context = useGeovistoContext();

    // const [counter, setCounter] = useState<number>(0);
    const [manager, setManager] = useState<IMapToolsManager>(Geovisto.createMapToolsManager([]));

    const handleToolChange = (toolData: IToolData) => {

        // console.log(toolData);
        // console.log("This tool called change: " + toolData.id);
        
        // console.log(toolElement!.type);
        
        const toolElement = childrenExtended?.find(el => el.props.id === toolData.id);
        
        
        if(React.isValidElement(toolElement))
        {
            // const manager = (context.tools as IMapToolsManager);
            // Get count of all tools configured by user
            let childrenCount = React.Children.count(childrenExtended);

            // All tools were loaded, handler was triggered by updating tool's properties
            if(manager.getAll().length === childrenCount)
            {
                console.log('here');

                let x = manager?.getById(toolData.id);

                let tool = processTool(toolElement.type, toolData);


                manager.removeById(toolData.id)

                // if(toolElement.type == ChoroplethLayerTool)
                //     (tool as ITilesLayerTool).render(LayerToolRenderType.STYLE);


                manager?.add(tool!);

                setManager(manager);
                props.onRenderChange!(manager);
            }

            // All tools were not initialized yet
            else if(manager.getAll().length <= childrenCount)
            {
                let tool = processTool(toolElement.type, toolData);
                
                // manager?.removeById(toolProps.id);
                
                manager.add(tool!);
    
                setManager(manager);
    
                context.setTools(manager!);

                if(manager.getAll().length === childrenCount)
                {
                    props.onRenderChange!(manager);
                }

                // setCounter(counter => counter + 1);
            }
            
            // props.onRenderChange!(manager);
        }

        //     if(counter === React.Children.count(props.children))
        //     {
        //         console.log("--- All tools processed");
        //         props.onRenderChange!(manager);

        //     }
        //     else
        //     {
        //         console.log("--- skipping (counter: " + counter + ")");
        //     }

        // }
        // else
        // {
        //     console.log("--- Should be updating");
    
            // manager?.removeById(toolProps.id);
            
            // let tool = processTool(reactTool);
            
            // manager?.add(tool!);

            // context.setTools(manager!);
            
            // props.onRenderChange!(manager);
        // }


        // console.log(childrenCopy)

    };

    // useEffect(() => {

    //     //TODO: How to process the change?     
        
    //     // const reactTool = childrenCopy?.find(el => el.props.id === toolProps.id);
    

    //     if(counter >= React.Children.count(props.children))
    //     {  
    //         // console.log(counter); 

    //         // if(React.isValidElement(reactTool))
    //         // {
    //         //     const manager = (context.tools as IMapToolsManager);
                                
    //         //     let tool = processTool(reactTool);
                
    //         //     // manager?.removeById(toolProps.id);
    //         //     manager?.add(tool!);
    
    //         //     context.setTools(manager!);
                
    //         //     props.onRenderChange!(manager);
    //         // }

    //         if(counter === React.Children.count(props.children))
    //         {
    //             console.log("--- All tools processed");
    //             console.log(manager);
    //             // props.onRenderChange!(manager);

    //         }
    //         else
    //         {
    //             console.log("--- Should be updating");
        
    //             // manager?.removeById(toolProps.id);
                
    //             // let tool = processTool(reactTool);
                
    //             // manager?.add(tool!);
    
    //             // context.setTools(manager!);
                
    //             // props.onRenderChange!(manager);
    //         }

    //     }
    
    // }, [counter])
    


    const childrenExtended = React.Children.map(props.children, (child, index) => {
    
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
  
    return <>{childrenExtended}</>;
}