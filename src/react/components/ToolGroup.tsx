import { map } from 'leaflet';
import React, { useEffect, useState } from 'react'
import { ChoroplethLayerTool, MarkerLayerTool, SidebarTool, ThemesTool, TilesLayerTool } from '.';
import { GeovistoChoroplethLayerTool, GeovistoMarkerLayerTool, GeovistoSidebarTool, 
         GeovistoThemesTool, GeovistoTilesLayerTool, IChoroplethLayerTool, IMapTool, IMapToolsManager, ISidebarTabProps, ISidebarTool, ISidebarToolProps, ITilesLayerTool, SidebarToolDefaults, } from '../..';
import { Geovisto, LayerToolRenderType } from '../../index.core';
import { CustomTool } from './CustomTool';
import { ISidebarToolDataProps } from './SidebarTool';
import { ENABLED_PROP, IToolData, IToolGroupProps, IToolType } from './Types';


export const ToolGroup = (props: IToolGroupProps) : JSX.Element => {

    // const [counter, setCounter] = useState<number>(0);
    const [manager, setManager] = useState<IMapToolsManager>(Geovisto.createMapToolsManager([]));
    // const [manager, setManager] = useState<IMapToolsManager>();
    const [tools, setTools] = useState<any[]>([]);

    const [sidebar, setSidebar] = useState<ISidebarToolDataProps<ISidebarToolProps>>();


    // const processTool = ([toolType, toolProps] : IToolData) => {
    const processTool = (toolType: IToolType, toolData: IToolData) => {

        console.log(toolData);

        let { children, onToolChange, ...toolProps } = toolData;

        switch (toolType) {
            case SidebarTool:
                return GeovistoSidebarTool.createTool(toolProps as ISidebarToolProps);
            case TilesLayerTool:
                return GeovistoTilesLayerTool.createTool(toolProps);
            case ChoroplethLayerTool:
                return GeovistoChoroplethLayerTool.createTool(toolProps);
            case MarkerLayerTool:
                return GeovistoMarkerLayerTool.createTool(toolProps);    
            case ThemesTool:
                return GeovistoThemesTool.createTool(toolProps);
            case CustomTool:
                return null //TODO: Change this to return some function
            default:
                console.error("Passed layer tool is not valid");
                return;
        }
    };


    // Sets tool and its sidebar tab as enabled/disabled
    const toolSetChecked = (toolData: IToolData) => {
        
        let tool = manager.getById(toolData.id) as IMapTool;
        let sidebarTool = manager.getByType("geovisto-tool-sidebar")[0];

        let tabs = (sidebarTool as ISidebarTool).getTabs();
        
        // Find the sidebar tab corresponding to the tool
        let tab = tabs.find(tab => tab.getTool().getProps().id == toolData.id);
        
        // Enable or disable the tool tab
        tab?.setChecked(toolData.enabled);
        
        // Enable or disable the tool
        tool.setEnabled(toolData.enabled);            
    }


    // Handler for ontToolChange() callback
    const handleToolChange = (toolData: IToolData, property: string) => {

        // Get original react element of the tool
        const toolElement = childrenExtended?.find(el => el.props.id === toolData.id);
        
        
        if(React.isValidElement(toolElement))
        {
            
            // Enabled property has changed
            if(property === ENABLED_PROP && manager.getById(toolData.id) !== undefined)
            {
                console.error("Enabled prop handler was called from: " + toolData.id);
                toolSetChecked(toolData);
                return;
            }

            // Get count of all tools configured by user
            const childrenCount = React.Children.count(childrenExtended);

            // INITIALIZATION: All tools were not initialized yet
            // else if(tools.length < childrenCount)
            if(manager.getAll().length < childrenCount)
            {
                let tool = processTool(toolElement.type, toolData);

                
                // TODO: Delete me
                if(toolElement.type == SidebarTool)
                {
                    setSidebar(toolData);
                }

                manager.add(tool!);
                setManager(manager);
                
                // setTools(tools => [...tools, tool]);
                
                // Added tool were the latest to process, map is ready to render
                if(manager.getAll().length === childrenCount)
                {
                    // let mapToolsManager = props.onRenderChange!(manager);
                    let map = props.onRenderChange!(manager);
                    let mapToolsManager = map.getState().getTools();

                    if (mapToolsManager !== undefined)
                        setManager(mapToolsManager);
                }

                return;
            }
            

            // UPDATING: All tools were loaded, handler was triggered by updating tool's properties
            if(manager.getAll().length === childrenCount)
            {        
                // let x = manager.getById(toolData.id);

                let processedTool = processTool(toolElement.type, toolData);

                console.log("updating");

                if(toolElement.type == ChoroplethLayerTool)
                {
                    console.error("RERENDER");


                    let tool = (manager.getById(toolData.id) as IChoroplethLayerTool);
                    console.log(tool);

                    // Re-render the tool
                    (tool).render(0, {transitionDelay: 100, transitionDuration: 1000});
                }
                else if(toolElement.type == TilesLayerTool)
                {
                    console.error("RERENDER");
                    // console.log(toolData);

                    console.warn("Not doin anything - check code!")
                    // console.log(tool);

                    manager.removeById(toolData.id)
                    
                    // TODO: Potřebuju to odstranit z Leaflet mapy 
                    // Musím vzít layer items (získat přes getlayeritems (v abstractlayertool - 145))
                    // A odstranit je fyzicky z té mapy

                    manager?.add(processedTool!);

                    let sidebarTool = manager.getByType(SidebarToolDefaults.TYPE)[0] as ISidebarTool;
                    
                    
                    if(sidebarTool !== undefined)
                    {

                        // let tabs = (sidebarTool as ISidebarTool).getTabs();
                        
                        console.log(sidebarTool);

                        let sidebarToolId = sidebarTool.getProps().id!;
                        
                        let processedSidebar = manager.getById(sidebarToolId) as ISidebarTool;
                        
                        
                        if(processedSidebar !== undefined)
                        {
                            manager.removeById(sidebarToolId)

                            // let processedSidebar = processTool(sidebarElement.type, sidebarElement.props);
                            
                            const toolElement = childrenExtended?.find(el => el.props.id === sidebarToolId);

                            const { children, onToolChange, ...sidebarToolProps } = sidebar!;
                            sidebarTool.initialize(sidebarToolProps as any);

                            console.log(sidebar);
                            let newSidebar = processTool(toolElement!.type, sidebar);
                            
                            console.warn("---------------under this--------------");
                            console.log(newSidebar);
                            console.log(processedSidebar);

                            
                            
                            manager?.add(processedSidebar!);
                        }
                        
                        // // Find the sidebar tab corresponding to the tool
                        // let tab = tabs.find(tab => tab.getTool().getProps().id == toolData.id);
                        
                        // if(tab !== undefined)
                        // {
                        //     // Enable or disable the tool tab
                        //     tab?.setChecked(toolData.enabled);
                        // }
                            
                    }

                    // let mapToolsManager = props.onRenderChange!(manager);
                    
                    // if (mapToolsManager !== undefined)
                    //     setManager(mapToolsManager);


                    // let tool = (manager.getById(toolData.id) as ITilesLayerTool);
                    
                    // let state = tool.getState();

                    // state.setBaseMap(toolData.baseMap);

                    // tool.initialize(toolData);

                    // (tool as ITilesLayerTool).render(LayerToolRenderType.STYLE);


                    // tool = processedTool! as ITilesLayerTool;



                    // let toolProps = tool.getProps()
                    // toolProps = toolData;


                    // tool.initialize(toolData);
                    // console.log(toolData);
                    // console.log(tool);

                    // setManager(manager);

                    // let mapToolsManager = props.onRenderChange!(manager);
                    
                    let map = props.onRenderChange!(manager);
                    let mapToolsManager = map.getState().getTools();

                    // if (mapToolsManager !== undefined)
                    //     setManager(mapToolsManager);
                    

                    // (tool).render(0, {transitionDelay: 100, transitionDuration: 1000});
                    // (tool as ITilesLayerTool).render(LayerToolRenderType.STYLE);
                }
                else if(toolElement.type == SidebarTool)
                {

                    let tool = (manager.getById(toolData.id) as ISidebarTool);
                    
                    tool.initialize(toolData);
                    
                    // manager.removeById(toolData.id)
                    // manager?.add(processTool(toolElement.type, tool)!);
                    
                    console.log(manager);

                    // let mapToolsManager = props.onRenderChange!(manager);

                    let map = props.onRenderChange!(manager);
                    let mapToolsManager = map.getState().getTools();

                    if (mapToolsManager !== undefined)
                        setManager(mapToolsManager);
                }
            }  
            else {
                console.log("Everything other");
            }
        }                      
    };

    // useEffect(() => {
    //     // Added tool were the latest to process, map is ready to render
    //     if(tools.length === React.Children.count(childrenExtended))
    //     {
    //         console.log(tools)
    //         props.onRenderChange!(Geovisto.createMapToolsManager(tools));
    //     }
    // }, [tools])

    const childrenExtended = React.Children.map(props.children, (child, index) => {
    
        if (!React.isValidElement(child))
            return;
            
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