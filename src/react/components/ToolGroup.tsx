import { map } from 'leaflet';
import * as L from 'leaflet';
import React, { useEffect, useRef, useState } from 'react'
import { ChoroplethLayerTool, MarkerLayerTool, SidebarTool, ThemesTool, TilesLayerTool } from '.';
import { GeovistoChoroplethLayerTool, GeovistoMarkerLayerTool, GeovistoSidebarTool, 
         GeovistoThemesTool, GeovistoTilesLayerTool, IChoroplethLayerTool, IMapTool, IMapToolsManager, ISidebarTabProps, ISidebarTool, ISidebarToolProps, ITilesLayerTool, SidebarToolDefaults, } from '../..';
import { Geovisto, ILayerTool, LayerToolRenderType } from '../../index.core';
import { CustomTool } from './CustomTool';
import { ISidebarToolDataProps, ISidebarToolHandle } from './SidebarTool';
import { ENABLED_PROP, IToolData, IToolGroupProps, IToolType } from './Types';
import { SidebarTab } from '../../tools';
import { SIDEBAR_ID, TILES_ID } from '../Constants';


export const ToolGroup = (props: IToolGroupProps) : JSX.Element => {

    // const [counter, setCounter] = useState<number>(0);
    const [manager, setManager] = useState<IMapToolsManager>(Geovisto.createMapToolsManager([]));

    // const [manager, setManager] = useState<IMapToolsManager>();
    const [tools, setTools] = useState<any[]>([]);

    const [sidebar, setSidebar] = useState<ISidebarToolDataProps<ISidebarToolProps>>();

    const sidebarRef = useRef<ISidebarToolHandle>(null);

    


    // const processTool = ([toolType, toolProps] : IToolData) => {
    const processTool = (toolType: IToolType, toolData: IToolData) => {

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

                console.error("------------ Updating -------------");
                console.warn("Edited tool: " + toolData.id);


                if(toolElement.type == ChoroplethLayerTool)
                {


                    let tool = (manager.getById(toolData.id) as IChoroplethLayerTool);
                    console.log(tool);

                    // Re-render the tool
                    (tool).render(0, {transitionDelay: 100, transitionDuration: 1000});
                }
                else if(toolElement.type == TilesLayerTool)
                {
                    
                    let currentTool = manager.getById(toolData.id) as ILayerTool;

                    // Remove current tool from manager
                    currentTool.hideLayerItems();
                    manager.removeById(toolData.id);

                    // Add tool with changed properties
                    manager.add(processedTool!);
                    
                    // let newTool = manager.getById(toolData.id) as ILayerTool;
                    // newTool.showLayerItems();

                    // let layerItems = currentTool?.getLayerItems();

                    // // render/remove items
                    // for(let j = 0; j < layerItems.length; j++) {
                    //     layerItems[j].addTo(leafletMap);
                    // }

                    
                    // TODO: Potřebuju to odstranit z Leaflet mapy 
                    // Musím vzít layer items (získat přes getlayeritems (v abstractlayertool - 145))
                    // A odstranit je fyzicky z té mapy
 


                    let sidebarTool = manager.getByType(SidebarToolDefaults.TYPE)[0] as ISidebarTool;
                    
                    let tab1 = [TILES_ID, new SidebarTab({
                        enabled:true,
                        name:"[My] Tiles layer",
                        icon:'<i class="fa fa-eur"></i>',
                        checkButton:true
                    } as ISidebarTabProps)]

                    let fakeprops = {
                        id:SIDEBAR_ID,
                        label:"Super cool sidebar",
                        tabs: [tab1]
                    }
                    
                    if(sidebarTool !== undefined) {

                        sidebarTool.removeFromMap();

                        // let tabs = (sidebarTool as ISidebarTool).getTabs();
                        
                        sidebarRef.current!.getProcessedTabs();

                        // console.log(manager.getByType(SidebarToolDefaults.TYPE)[0] as ISidebarTool);
                        // manager.removeById(sidebarTool.getId());
                        
                        // const toolElement = childrenExtended?.find(el => el.props.id === sidebarTool.getProps().id);
                        
                        // let newSidebarTool = processTool(toolElement!.type, fakeprops)
                        
                        
                        // manager?.add(newSidebarTool!);
                        // console.log(manager.getByType(SidebarToolDefaults.TYPE)[0] as ISidebarTool);

                        // let tabs = sidebarTool.getTabs();
                        // tabs.forEach(tab => {
                        //     tab.redraw();
                        // });
                        // // let processedSidebar = processTool(sidebarElement.type, sidebarElement.props);
                        

                        // const { children, onToolChange, ...sidebarToolProps } = sidebar!;
                        // // sidebarTool.initialize(sidebarToolProps as any);

                        // console.log(sidebarTool.getState());
                        // let newSidebar = processTool(toolElement!.type, sidebar);
                        
                        // console.warn("---------------under this--------------");
                        // console.log(newSidebar);
                        // console.log(sidebarTool);

                        
                        
                        
                        // // Find the sidebar tab corresponding to the tool
                        // let tab = tabs.find(tab => tab.getTool().getProps().id == toolData.id);
                        
                        // if(tab !== undefined)
                        // {
                        //     // Enable or disable the tool tab
                        //     tab?.setChecked(toolData.enabled);
                        // }
                            
                    }
                    // Sidebar component is not present, rerender the tool immiediately
                    else {

                        console.error("Sidebar is not present, rerender the tool immiediately");
                        let map = props.onRenderChange!(manager);                
                        let mapToolsManager = map.getState().getTools();
    
                        if (mapToolsManager !== undefined) {
                            setManager(mapToolsManager);
                        }
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
                    
                    


                    /////////////////////// OOOOOOLDDDD //////////////////
                    // let oldSidebarTool = manager.getByType(SidebarToolDefaults.TYPE)[0] as ISidebarTool;
                    
                    // oldSidebarTool.removeFromMap();
                    // console.log(oldSidebarTool);
                    // console.log(oldSidebarTool.getState().getSidebar());
                    
                    
                    // let map = props.onRenderChange!(manager);
                    // oldSidebarTool.initialize({map, ...fakeprops});
                    
                    // let mapToolsManager = map.getState().getTools();

                    // let sidebar = map.getState().getTools().getByType(SidebarToolDefaults.TYPE)[0] as ISidebarTool;
                    // console.log(sidebar.getState().getSidebar());

                    // console.log(map);
                    
                    // if (mapToolsManager !== undefined)
                    // setManager(mapToolsManager);
                    
                    

                    // (tool).render(0, {transitionDelay: 100, transitionDuration: 1000});
                    // (tool as ITilesLayerTool).render(LayerToolRenderType.STYLE);
                }
                else if(toolElement.type == SidebarTool)
                {
                    console.error("ATTENTION: Sidebar has changed");

                        
                    let currentTool = manager.getById(toolData.id) as ISidebarTool;

                    // Remove current tool from manager
                    currentTool.removeFromMap();
                    manager.removeById(toolData.id);
                    
                    // Add tool with changed properties
                    manager.add(processedTool!);

                    let map = props.onRenderChange!(manager);
                    let mapToolsManager = map.getState().getTools();

                    if (mapToolsManager !== undefined) {
                        setManager(mapToolsManager);
                    }
                }
            }  
            else {
                console.error("Everything other");
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
    
        if (!React.isValidElement(child)) {
            return;
        }
            
        // if(child.type != CustomTool)
        // {
            let newProps = {...child.props};
    
            newProps.onToolChange = handleToolChange

            if(child.type == SidebarTool) {
                newProps.ref=sidebarRef
            }

            return React.cloneElement(child, newProps, child.props.children);
        // }
        // return child;
    });
  
    return <>{childrenExtended}</>;
}