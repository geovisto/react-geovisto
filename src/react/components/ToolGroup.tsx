import React, { useRef, useState } from 'react';
import { ChoroplethLayerTool, MarkerLayerTool, SidebarTool, ThemesTool, TilesLayerTool } from '.';
import { GeovistoChoroplethLayerTool, GeovistoMarkerLayerTool, GeovistoSidebarTool, 
         GeovistoThemesTool, GeovistoTilesLayerTool, IMapTool, IMapToolsManager, ISidebarTool, ISidebarToolProps, SidebarToolDefaults, } from '../..';
import { Geovisto, ILayerTool } from '../../index.core';
import { CustomTool } from './CustomTool';
import { ISidebarToolHandle } from './SidebarTool';
import { IReactElement, IToolData, IToolGroupProps } from './Types';
import { IChoroplethLayerToolProps, IMarkerLayerToolProps, IThemesToolProps, ITilesLayerToolProps } from '../../tools';
import { ENABLED_PROP, ID_PROP, supportedComponentTypes } from '../Constants';


export const ToolGroup = (props: IToolGroupProps) : JSX.Element => {

    const [manager, setManager] = useState<IMapToolsManager>(Geovisto.createMapToolsManager([]));
    const [toolChangedArray, setToolChangedArray] = useState<[string, boolean][]>([]);
    const sidebarRef = useRef<ISidebarToolHandle>(null);

    /**
     * Sets dirty bit if tool properties was changed while not enabled
     */
    const setDirtyBit = (id: string, bit: boolean) => {
        
        const toolRecord: [string, boolean] = [id, bit];
        setToolChangedArray(arr => [...arr.map(tool => tool[0] === id ? toolRecord : tool)]);
    };

    /**
     * Returns dirty bit by tool id
     */
    const getDirtyBit = (id: string): boolean => {
        
        const record = toolChangedArray.find(tool => tool[0] === id);
        return record ? record[1] : false;
    };

    /**
     * Emits parent callback to re-render the map and sets the current state
     */
    const emitRerender = () => {

        const map = props.onRenderChange?.(manager);

        if(map !== undefined) {
            const mapToolsManager = map.getState().getTools();
            
            if (mapToolsManager !== undefined) {
                setManager(mapToolsManager);
            }
        }
    };

    /**
     * Returns tool in a Geovisto library representation
     */
    const processTool = (toolType: IReactElement, toolData: IToolData): IMapTool => {

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
                //TODO: Change this to return some function
                throw new Error('Not implemented');
            default:
                throw new Error('Error: Unknown type of the tool. Component is not valid.');
        }
    };

    /**
     * Sets tool and its sidebar tab as enabled/disabled
     */
    const toolSetChecked = (toolData: IToolData) => {
        
        const tool = manager.getById(toolData.id) as IMapTool;
        const sidebarTool = manager.getByType(SidebarToolDefaults.TYPE)[0];

        // Disable also checkbox on the tab when the tool is disabled
        if(sidebarTool !== undefined && tool !== sidebarTool) {

            const tabs = (sidebarTool as ISidebarTool).getTabs();
            
            // Find the sidebar tab corresponding to the tool
            const tab = tabs.find(tab => tab.getTool().getProps().id == toolData.id);
            
            // Enable or disable the tool tab
            tab?.setChecked(toolData.enabled);    
        }

        // Enable or disable the tool
        
        // TODO: očistit props od tool methods a tak
        // if(tool.getProps() != toolData)
        
        if(toolData.enabled && getDirtyBit(toolData.id)) {
            
            setDirtyBit(toolData.id, false);
            handleToolChange(toolData);
        }
        else {
            tool.setEnabled(toolData.enabled);            
        }

        // if(_.isEqual()) {
        //     console.error('Need to rerender');
        // }
    };

    /**
     * Handler for the ontToolChange() callback
     */
    const handleToolChange = (toolData: IToolData, property?: string) => {

        // Get original react element of the tool
        const toolElement = childrenExtended?.find(el => el.props.id === toolData.id);
        
        // Get count of all tools configured by user
        const childrenCount = React.Children.count(childrenExtended);

        if(React.isValidElement(toolElement))
        {
            // Initialization: All tools were not initialized yet
            if(manager.getAll().length < childrenCount)
            {
                const tool = processTool(toolElement.type, toolData);
                manager.add(tool);

                setToolChangedArray(arr => [[toolData.id, false], ...arr]);
                
                // Added tool were the latest to process, map is ready to render
                if(manager.getAll().length === childrenCount) {
                    emitRerender();
                }
                
                return;
            }

            // Updating: Enabled property has changed
            else if(property === ENABLED_PROP && manager.getById(toolData.id) !== undefined)
            {
                console.error('Enabled prop handler was called from: ' + toolData.id);
                toolSetChecked(toolData);
                return;
            }

            // TODO: If the ID property changed
            
            // Updating: All tools were loaded, handler was triggered by updating tool's properties
            else if(manager.getAll().length === childrenCount)
            {        
                console.warn('----- Updating - Edited tool: ' + toolData.id + ' ----------');
                
                if(supportedComponentTypes.includes(toolElement.type) && toolElement.type != SidebarTool) {
                    
                    // const toolId = property === ID_PROP ? toolData.prevId : toolData.id;  
                    const currentTool = manager.getById(toolData.id) as ILayerTool;
                    
                    // Remove current tool from manager
                    currentTool.hideLayerItems();
                    manager.removeById(toolData.id);
                    
                    // Add tool with changed properties
                    const processedTool = processTool(toolElement.type, toolData);
                    manager.add(processedTool);
                    
                    // TODO: Z konzultace ------------------
                    // Potřebuju to odstranit z Leaflet mapy 
                    // Musím vzít layer items (získat přes getlayeritems (v abstractlayertool - 145))
                    // A odstranit je fyzicky z té mapy
                    // setManager(manager);

                    const sidebarTool = manager.getByType(SidebarToolDefaults.TYPE)[0] as ISidebarTool;
                    // let sidebarTab = sidebarTool.getTabs().find(tab => tab.getId() == toolData.id);

                    // Sidebar tool is present in configuration
                    if(sidebarTool !== undefined && toolData.enabled) {

                        // Process all the sidebar tabs so the tool tab reflects changes in tool properties
                        sidebarRef.current?.getProcessedTabs();                            
                    }
                    // Sidebar component is not present, rerender the tool immiediately
                    else {
                        console.warn('Sidebar is not present, rerender the tool immiediately');
                        
                        // Rerender the map only if the tool is enabled (might be visible)
                        if(toolData.enabled) {
                            emitRerender();
                        }
                        else {
                            setDirtyBit(toolData.id, true);
                            console.log(toolChangedArray);
                        }

                    }

                }
                else if(toolElement.type == SidebarTool) {

                    const currentTool = manager.getById(toolData.id) as ISidebarTool;

                    // FIXME: removeFromMap: This is not original code -> remove?
                    // Leaflet map needs to be re-rendered when sidebar enabled state is modified

                    // Remove sidebar elements from the leaflet map
                    if(currentTool.isEnabled()) {
                        const sidebar = currentTool.getState().getSidebar()?.remove();

                        if(sidebar) {   
                            currentTool.getState().setSidebar(sidebar);
                        }
                    }
                    
                    manager.removeById(toolData.id);
                    
                    // Add tool with changed properties
                    const  processedTool = processTool(toolElement.type, toolData);
                    manager.add(processedTool);

                    //TODO: setManager(manager) ???????

                    // FIXME: Tento if byl přidán a nevím jestli je úplně legit
                    // Re-render only when the tool is enabled
                    if(toolData.enabled) {
                        emitRerender();
                    }
                }
                else {
                    throw Error(`Update: Tool is not supported`);
                }   
            }  
            else {
                console.error('Everything other');
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

        const toolProps = {...child.props};

        toolProps.key = index;
        toolProps.onToolChange = handleToolChange;

        // Add ref to SidebarTool
        if(child.type == SidebarTool) {
            toolProps.ref = sidebarRef;
        }

        return React.cloneElement(child, toolProps, child.props.children);
    });

    return <>{childrenExtended}</>;
};