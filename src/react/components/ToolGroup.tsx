import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { IMapTool, IMapToolsManager, ISidebarTool, SidebarToolDefaults, } from '../..';
import { Geovisto, ILayerTool } from '../../index.core';

import { SidebarTool } from '.';
import { ENABLED_PROP, ID_PROP, supportedComponentTypes, TILES_ID } from '../Constants';
import { isLayerTool, getToolInstance } from '../Helpers';
import { IReactElement, ISidebarToolHandle, IToolData, IToolGroupHandle, IToolGroupProps } from '../types';


export const ToolGroup = forwardRef<IToolGroupHandle, IToolGroupProps>((props, ref) : JSX.Element => {

    const [manager, setManager] = useState<IMapToolsManager>(Geovisto.createMapToolsManager([]));
    
    // Array to keep flag for every tool signalizing if the tool has been changed
    // but is not visible, so it needs to be re-rendered once is visible again
    const [toolDirtyBitArray, setToolDirtyBitArray] = useState<[string, boolean][]>([]);

    const sidebarRef = useRef<ISidebarToolHandle>(null);

    // Expose method to process and re-render the tools
    useImperativeHandle(ref, () => ({
        rerenderTools: () => {
            if(childrenExtended?.some(el => el.type === SidebarTool)) {
                sidebarRef.current?.getTabs();
            }
            else {
                emitRerender();
            }
        }
    }));

    // useEffect(() => {
    //   console.log("Manager has changed");

    // }, [manager])
    

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


        // console.log("EMIT: --------------------------------")
        // console.log(manager.getById(TILES_ID)?.getProps().enabled);
        // console.log(manager.getById(TILES_ID)?.getState().isEnabled());
        // console.log("--------------------------------")

        const map = props.onRenderChange?.(manager);

        // const layers: any[] = [];
        // map?.getState().getLeafletMap()?.eachLayer(l => layers.push(l));
        // console.log(JSON.stringify(layers[0]));


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
            console.log("tool state: " + manager.getById(TILES_ID)?.getState().isEnabled());
            console.log("tool props: " + JSON.stringify(manager.getById(TILES_ID)?.getProps().enabled));
            console.log("toolData enabled: " + toolData.enabled);

            // keep
            (manager.getById(toolData.id) as IMapTool).setEnabled(toolData.enabled);

            (manager.getById(toolData.id) as IMapTool).getMap()?.getState().getLeafletMap();
            console.log("setEnabled was called");

            // keep
            tool.getProps().enabled = toolData.enabled;
    
            console.log('--------------------------------------------');
            console.log("tool state: " + manager.getById(TILES_ID)?.getState().isEnabled());
            console.log("tool props: " + JSON.stringify(manager.getById(TILES_ID)?.getProps().enabled));
            console.log("toolData enabled: " + toolData.enabled);

            sidebarRef.current?.getTabs();
        }
    };

    /**
     * Initializes the tool internal reprezentation from React element
     */
    const initTool = (toolData: IToolData, type: IReactElement, childrenCount: number) => {
        
        const tool = getToolInstance(type, toolData);
        manager.add(tool);

        setToolDirtyBitArray(arr => [[toolData.id, false], ...arr]);
        
        // Added tool were the latest to process, map is ready to render
        if(manager.getAll().length === childrenCount) {
            emitRerender();
        }
    };

    /**
     * Removes old tool from the manager and adds new instance with new properties
     */
    const processToolUpdate = (toolData: IToolData, type: IReactElement, currentTool: Record<string, any>, property?: string) => {

        if(currentTool.toolIsLayerTool) {
            (currentTool.data as ILayerTool).hideLayerItems();
        }
        
        // Remove current tool from manager
        manager.removeById(currentTool.id);
        
        // Add tool with changed properties
        const processedTool = getToolInstance(type, toolData);
        manager.add(processedTool);
        
        const sidebarTool = manager.getByType(SidebarToolDefaults.TYPE)[0] as ISidebarTool;

        // Reasons to re-render:
        // - the sidebar tool is present in configuration and tool is enabled (visible)
        // - the 'id' property changed -> therefore sidebar tabs must be re-rendered
        // - the tool is not layer tool, so 'enabled' property change requires re-render
        const rerenderTool = toolData.enabled || property === ID_PROP || !currentTool.toolIsLayerTool;

        if(sidebarTool !== undefined && sidebarTool.getProps().enabled && rerenderTool) {

            // Process all the sidebar tabs so the tool tab reflects changes in tool properties
            // Ref call will result in calling 'handleToolChange' method directly from Sidebar 
            // component with updated data
            sidebarRef.current?.getTabs();                            
        }
        else {

            // Sidebar component is not present, re-render the tool immediately if tool is enabled 
            if(rerenderTool) {
                emitRerender();
            }
            else {
                setDirtyBit(toolData.id, true);
            }
        }
    };

    /**
     * Removes old sidebar from the manager and adds new with new properties
     */
    const processSidebarUpdate = (toolData: IToolData, type: IReactElement, currentTool: Record<string, any>) => {

        const tool = currentTool.data as ISidebarTool;

        // Remove sidebar elements from the leaflet map
        // TODO: Not sure about this -- delete whole if?
        if(tool.getProps().enabled) {
            const sidebar = tool.getState().getSidebar()?.remove();

            if(sidebar) {   
                tool.getState().setSidebar(sidebar);
            }
        }

        // Remove current tool from manager
        manager.removeById(currentTool.id);
        
        // Add tool with changed properties
        const processedTool = getToolInstance(type, toolData);
        manager.add(processedTool);

        // Re-render only when the sidebar tool is supposed to be enabled
        if(toolData.enabled) {
            emitRerender();
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

        console.error('hadnleToolChange called from: ' + toolData.id);

        if(React.isValidElement(toolElement))
        {
            // Initialization: All tools were not initialized yet
            if(manager.getAll().length < childrenCount)
            {
                initTool(toolData, toolElement.type, childrenCount);
                return;
            }
            
            // Updating: All tools were loaded, handler was triggered by updating tool's properties
            else {

                const toolId = property === ID_PROP ? toolData.prevId : toolData.id;
                const currentTool = manager.getById(toolId) as IMapTool;

                // If some parameters are functions as parameters, functions are causing rerender everytime some tool changes
                // so the tool might be missing in the manager at this time 
                if(currentTool === undefined) {
                    return;
                    // throw Error ('Updated tool is not present in the tools manager.');
                }
                
                // Updating: Standard way of processing props changes - recreate the tool
                if(manager.getAll().length === childrenCount)
                {        
                    // Decides whether tool implements ILayerTool or IMapTool interface
                    const toolIsLayerTool = isLayerTool(currentTool);
                    
                    switch (property) {
                        case ID_PROP:
                            replaceIdInDirtyBitArray(toolData.prevId, toolData.id);    
                            break;

                        case ENABLED_PROP:
                            if(toolIsLayerTool) {
                                toolSetChecked(toolData);        
                                return;
                            }
                            break;

                        default:
                            break;
                    }
                
                    // Manage updating of a SidebarTool component props 
                    if(toolElement.type === SidebarTool) {
  
                        processSidebarUpdate(toolData, toolElement.type, {
                            id: toolId,
                            data: currentTool,
                            isLayerTool: toolIsLayerTool
                        });
                 
                        return;
                    }

                    // Manage updating of all others tool component props 
                    else if(supportedComponentTypes.includes(toolElement.type)) {
                        
                        processToolUpdate(toolData, toolElement.type, {
                            id: toolId,
                            data: currentTool,
                            isLayerTool: toolIsLayerTool
                        }, property);

                        return;
                    }

                    else {
                        throw Error('Error while providing update - Tool is not supported.');
                    }   
                }  
            
                else {
                    throw Error('Error while processing tools.');
                }
            }
        }                      
    };

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
});