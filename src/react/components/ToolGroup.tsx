import React, { useRef, useState } from 'react'
import { ChoroplethLayerTool, MarkerLayerTool, SidebarTool, ThemesTool, TilesLayerTool } from '.';
import { GeovistoChoroplethLayerTool, GeovistoMarkerLayerTool, GeovistoSidebarTool, 
         GeovistoThemesTool, GeovistoTilesLayerTool, IMapTool, IMapToolsManager, ISidebarTool, ISidebarToolProps, SidebarToolDefaults, } from '../..';
import { Geovisto, ILayerTool } from '../../index.core';
import { CustomTool } from './CustomTool';
import { ISidebarToolHandle } from './SidebarTool';
import { ENABLED_PROP, IToolData, IToolGroupProps, IToolType } from './Types';
import { IChoroplethLayerToolProps, IMarkerLayerToolProps, IThemesToolProps, ITilesLayerToolProps } from '../../tools';
import { supportedComponentTypes } from '../Constants';


export const ToolGroup = (props: IToolGroupProps) : JSX.Element => {

    const [manager, setManager] = useState<IMapToolsManager>(Geovisto.createMapToolsManager([]));

    const sidebarRef = useRef<ISidebarToolHandle>(null);

    // const sidebarIsPresent : boolean =  

    const emitRerender = () => {

        const map = props.onRenderChange!(manager);
        const mapToolsManager = map.getState().getTools();

        if (mapToolsManager !== undefined)
            setManager(mapToolsManager);
    };

    const processTool = (toolType: IToolType, toolData: IToolData) => {

        const { children, onToolChange, ...toolProps } = toolData;

        switch (toolType) {
            case SidebarTool:
                return GeovistoSidebarTool.createTool(toolProps as ISidebarToolProps);
            case TilesLayerTool:
                return GeovistoTilesLayerTool.createTool(toolProps as ITilesLayerToolProps);
            case ChoroplethLayerTool:
                return GeovistoChoroplethLayerTool.createTool(toolProps as IChoroplethLayerToolProps);
            case MarkerLayerTool:
                return GeovistoMarkerLayerTool.createTool(toolProps as IMarkerLayerToolProps);    
            case ThemesTool:
                return GeovistoThemesTool.createTool(toolProps as IThemesToolProps);
            case CustomTool:
                return null; //TODO: Change this to return some function
            default:
                throw new Error("Error: Unknown type of the tool. Component is not valid.");
                return undefined;
        }
    };


    /**
     * Sets tool and its sidebar tab as enabled/disabled
     */
    const toolSetChecked = (toolData: IToolData) => {
        
        const tool = manager.getById(toolData.id) as IMapTool;
        const sidebarTool = manager.getByType(SidebarToolDefaults.TYPE)[0];

        // Disable also checkbox on the tab when the tool is disabled
        if(sidebarTool !== undefined) {

            const tabs = (sidebarTool as ISidebarTool).getTabs();
            
            // Find the sidebar tab corresponding to the tool
            const tab = tabs.find(tab => tab.getTool().getProps().id == toolData.id);
            
            // Enable or disable the tool tab
            tab?.setChecked(toolData.enabled);    
        }

        // Enable or disable the tool
        tool.setEnabled(toolData.enabled);            
    };

    /**
     * Handler for ontToolChange() callback
     */
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
                const tool = processTool(toolElement.type, toolData);

                manager.add(tool!);
                setManager(manager);
                
                // setTools(tools => [...tools, tool]);
                
                // Added tool were the latest to process, map is ready to render
                if(manager.getAll().length === childrenCount)
                {
                    // let mapToolsManager = props.onRenderChange!(manager);
                    emitRerender();
                }

                return;
            }
            

            // UPDATING: All tools were loaded, handler was triggered by updating tool's properties
            if(manager.getAll().length === childrenCount)
            {        
                // let x = manager.getById(toolData.id);

                console.error("----- Updating - Edited tool: " + toolData.id + " ----------");
                
                if(supportedComponentTypes.includes(toolElement.type) && toolElement.type != SidebarTool) {
                    
                    const currentTool = manager.getById(toolData.id) as ILayerTool;
                    
                    // Remove current tool from manager
                    currentTool.hideLayerItems();
                    manager.removeById(toolData.id);
                    
                    // Add tool with changed properties
                    const processedTool = processTool(toolElement.type, toolData);
                    manager.add(processedTool!);
                    
                    // TODO: Z konzultace ------------------
                    // Potřebuju to odstranit z Leaflet mapy 
                    // Musím vzít layer items (získat přes getlayeritems (v abstractlayertool - 145))
                    // A odstranit je fyzicky z té mapy
 

                    const sidebarTool = manager.getByType(SidebarToolDefaults.TYPE)[0] as ISidebarTool;
                    // let sidebarTab = sidebarTool.getTabs().find(tab => tab.getId() == toolData.id);

                    // Sidebar tool is present in configuration
                    if(sidebarTool !== undefined) {

                        // sidebarTool.removeFromMap();
                        sidebarRef.current!.getProcessedTabs();                            
                    }
                    // Sidebar component is not present, rerender the tool immiediately
                    else {

                        console.error("Sidebar is not present, rerender the tool immiediately");
                        
                        emitRerender();
                    }

                }
                else if(toolElement.type == SidebarTool) {

                    const currentTool = manager.getById(toolData.id) as ISidebarTool;

                    // Remove current tool from manager
                    currentTool.removeFromMap();
                    manager.removeById(toolData.id);
                    
                    // Add tool with changed properties
                    const  processedTool = processTool(toolElement.type, toolData);
                    manager.add(processedTool!);

                    emitRerender();
                }
                else {
                    throw Error(`Update: Tool is not supported`);
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
    
        // Ignore components that are not supported (= provided by this library)
        if (!React.isValidElement(child) || !supportedComponentTypes.includes(child.type)) {
            
            console.warn(`Following element is not supported and will be skipped.`);
            console.warn(child);
            
            return;
        }            

        const newProps = {...child.props};

        newProps.onToolChange = handleToolChange;

        // Add ref to SidebarTool
        if(child.type == SidebarTool) {
            newProps.ref=sidebarRef;
        }

        return React.cloneElement(child, newProps, child.props.children);
    });

    console.log(childrenExtended);
  
    return <>{childrenExtended}</>;
};