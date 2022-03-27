import React, { useRef, useState } from 'react';
import { SidebarTool } from '.';
import { IMapTool, IMapToolsManager,
         ISidebarTool, SidebarToolDefaults, } from '../..';
import { Geovisto, ILayerTool } from '../../index.core';
import { ISidebarToolHandle } from './SidebarTool';
import { IToolData, IToolGroupProps } from '../Types';
import { ENABLED_PROP, ID_PROP, supportedComponentTypes } from '../Constants';
import { isLayerTool, processTool } from '../Helpers';
import { BlueSkyLayerTool } from '../../tools/layers/bluesky';


export const ToolGroup = (props: IToolGroupProps) : JSX.Element => {

    const [manager, setManager] = useState<IMapToolsManager>(Geovisto.createMapToolsManager([]));
    
    // Array to keep flag for every tool signalizing if the tool has been changed
    // but is not visible, so it needs to be re-rendered once is visible again
    const [toolDirtyBitArray, setToolDirtyBitArray] = useState<[string, boolean][]>([]);

    const sidebarRef = useRef<ISidebarToolHandle>(null);

    /**
     * Sets dirty bit if tool properties was changed while not enabled
     */
    const setDirtyBit = (id: string, bit: boolean) => {
        
        const toolRecord: [string, boolean] = [id, bit];
        setToolDirtyBitArray(arr => [...arr.map(tool => tool[0] === id ? toolRecord : tool)]);
    };

    /**
     * Returns dirty bit by tool id
     */
    const getDirtyBit = (id: string): boolean => {
        
        const record = toolDirtyBitArray.find(tool => tool[0] === id);
        return record ? record[1] : false;
    };

    /**
     * Replaces id in dirty bit array 
     */
    const replaceIdInDirtyBitArray = (prevId: string, newId: string): void => {
        
        // Get index of the tool 
        const toolDirtyBitArrayCopy = [...toolDirtyBitArray];
        const index = toolDirtyBitArray.findIndex(tool => tool[0] === prevId);

        // Set new Id
        toolDirtyBitArrayCopy[index][0] = newId;
        setToolDirtyBitArray(toolDirtyBitArrayCopy);
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

                // Reset the dirty bit flags, because all tools were re-rendered
                setToolDirtyBitArray(arr => arr.map(tool => [tool[0], false]));
            }
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
        
        if(toolData.enabled && getDirtyBit(toolData.id)) {
            // Reset the dirty bit and proceed the tool to process         
            setDirtyBit(toolData.id, false);
            handleToolChange(toolData);
        }
        else {
            // Enable or disable the tool
            tool.setEnabled(toolData.enabled);
            tool.getProps().enabled = toolData.enabled;            
        }
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

                setToolDirtyBitArray(arr => [[toolData.id, false], ...arr]);
                
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
            
            // Updating: All tools were loaded, handler was triggered by updating tool's properties
            else if(manager.getAll().length === childrenCount)
            {        
                console.warn('----- Updating - Edited tool: ' + toolData.id + ' ----------');
                
                // Replace the id of the tool in the dirty bit array 
                if(property !== undefined && property === ID_PROP) {
                    replaceIdInDirtyBitArray(toolData.prevId, toolData.id);
                }

                if(supportedComponentTypes.includes(toolElement.type) && toolElement.type != SidebarTool) {
                    
                    const toolId = property === ID_PROP ? toolData.prevId : toolData.id;  

                    // TODO: [Filters] Maybe IMapTool and add '?.' to hidelayeritems?
                    const currentTool = manager.getById(toolId) as IMapTool;
                    
                    // TODO: Nějak rozuměji odlišit tooly s 'enable' přístupem jako k jiným properties
                    /// Možná jim přidat taky useDidEnabledUpdate a rozlišovat to až tu, jestli je to layer tool
                    const toolIsLayerTool = isLayerTool(currentTool);
                    
                    if(toolIsLayerTool) {
                        (currentTool as ILayerTool).hideLayerItems();
                    }
                    
                    // Remove current tool from manager
                    manager.removeById(toolId);
                    
                    // Add tool with changed properties
                    const processedTool = processTool(toolElement.type, toolData);
                    manager.add(processedTool);
                    
                    const sidebarTool = manager.getByType(SidebarToolDefaults.TYPE)[0] as ISidebarTool;
                    // let sidebarTab = sidebarTool.getTabs().find(tab => tab.getId() == toolData.id);

                    // Sidebar tool is present in configuration and tool is enabled (visible)
                    // or the 'id' property changed -> therefore sidebar tabs must be re-rendered
                    // or tool is not layer tool, so 'enabled' property change requires re-render as well
                    const rerenderTool = toolData.enabled || property === ID_PROP || !toolIsLayerTool;

                    if(sidebarTool !== undefined && /*sidebarTool.isEnabled()*/sidebarTool.getProps().enabled && rerenderTool) {

                        console.warn('Sidebar is present, call the ref on sidebar tool');

                        // Process all the sidebar tabs so the tool tab reflects changes in tool properties
                        // Ref call will result in calling 'handleToolChange' method directly from Sidebar 
                        // component with updated data
                        sidebarRef.current?.getTabs();                            
                    }
                    // Sidebar component is not present, re-render the tool immediately
                    else {
                        console.warn('Sidebar is not present, rerender the tool immediately');
                        
                        // Re-render the map only if the tool is enabled (might be visible)
                        if(rerenderTool) {
                            emitRerender();
                        }
                        else {
                            console.warn('setting dirty bit');
                            setDirtyBit(toolData.id, true);
                        }

                    }

                }
                else if(toolElement.type == SidebarTool) {

                    const toolId = property === ID_PROP ? toolData.prevId : toolData.id;  
                    const currentTool = manager.getById(toolId) as ISidebarTool;

                    // Remove sidebar elements from the leaflet map
                    // TODO: Not sure about this -- delete whole if?
                    if(/*currentTool.isEnabled()*/currentTool.getProps().enabled) {
                        const sidebar = currentTool.getState().getSidebar()?.remove();

                        if(sidebar) {   
                            currentTool.getState().setSidebar(sidebar);
                        }
                    }
                    
                    manager.removeById(toolId);
                    
                    // Add tool with changed properties
                    const  processedTool = processTool(toolElement.type, toolData) as ISidebarTool;
                    manager.add(processedTool);

                    //TODO: setManager(manager) ???????

                    // FIXME: Tento if byl přidán a nevím jestli je úplně legit
                    // Re-render only when the tool is enabled
                    if(toolData.enabled) {
                        console.warn('Re-rending sidebar');
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
    //         props.onRenderChange!(Geovisto.createMapToolsManager(tools));
    //     }
    // }, [tools])

    /**
     * Validate and process all children elements and add additional props
     */
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
        if(child.type === SidebarTool) {
            toolProps.ref = sidebarRef;
        }

        return React.cloneElement(child, toolProps, child.props.children);
    });

    return <>{childrenExtended}</>;
};