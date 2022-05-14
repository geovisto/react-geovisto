import React, { forwardRef, ReactElement, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';

import { Geovisto, ILayerTool, IMapTool, IMapToolsManager } from 'geovisto';
import { ISidebarTool, SidebarToolDefaults } from 'geovisto-sidebar';

import { SidebarTool } from '.';
import { ENABLED_PROP, ID_PROP, supportedComponentTypes } from '../Constants';
import { isLayerTool, getToolInstance } from '../Helpers';
import { IReactElement, ISidebarToolHandle, IToolData, IToolGroupHandle, IToolGroupProps, IToolInfo } from '../types';
import { useDidUpdateEffect } from '../Hooks';


export const ToolGroup = forwardRef<IToolGroupHandle, IToolGroupProps>((props, ref) : JSX.Element => {

    const [manager, setManager] = useState<IMapToolsManager>(Geovisto.createMapToolsManager([]));

    // Array to keep flag for every tool signalizing if the tool has been changed
    // but is not visible, so it needs to be re-initialized once is visible again
    const [toolDirtyBitArray, setToolDirtyBitArray] = useState<[string, boolean][]>([]);

    // Queue for storing tools enable/disable operation ka 
    const [enabledToolQueue, setEnabledToolQueue] = useState<[string, boolean][]>([]);

    const sidebarRef = useRef<ISidebarToolHandle>(null);
    
    const childrenExtended: ReactElement[] = [];

    let updatingManagerLock = false;
    const setLock = (value: boolean) => updatingManagerLock = value;

    // Expose method to process and re-render the tools
    useImperativeHandle(ref, () => ({
        rerenderTools: () => rerender()
    }));

    // After the updated manager was set, run the queued enable/disable tool tasks
    useEffect(() => {
      setLock(false);

      if(enabledToolQueue.length !== 0)
      {
          enabledToolQueue.forEach(toolData => {
            const id = toolData[0] as string;
            const enabled = toolData[1] as boolean; 
            const tool = manager.getById(id) as IMapTool;
            
            if(tool !== undefined) {
                tool.setEnabled(enabled);
                tool.getProps().enabled = enabled;
            }
          });

          setEnabledToolQueue([]);
      }
    }, [manager]);
    
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
     * Rerenders the content with the Sidebar in mind
     */
    const rerender = () => {
        if(childrenExtended?.some(el => el.type === SidebarTool)) {
            sidebarRef.current?.getTabs();
        }
        else {
            emitRerender();
        }
    }

    /**
     * Emits parent callback to re-render the map and sets the current state
     */
    const emitRerender = () => {

        const map = props.onRenderChange?.(manager);
        
        if(map !== undefined) {
            const mapToolsManager = map.getState().getTools();
            
            if (mapToolsManager !== undefined) {
                setLock(true);
                setManager(mapToolsManager);

                // Reset the dirty bit flags, because all tools were re-rendered
                setToolDirtyBitArray(arr => arr.map(tool => [tool[0], false]));
            }
        }
    };

    /**
     * Sets tool and its sidebar tab as enabled/disabled
     */
    const toolSetEnabled = (toolData: IToolData) => {

        const tool = manager.getById(toolData.id) as ILayerTool;
        const sidebarTool = manager.getByType(SidebarToolDefaults.TYPE)[0];

        // Disable also checkbox on the tab when the tool is disabled
        if(sidebarTool !== undefined) {

            const tabs = (sidebarTool as ISidebarTool).getTabs();
            
            // Find the sidebar tab corresponding to the tool
            const tab = tabs.find(tab => tab.getTool().getId() === toolData.id);
            
            // Enable or disable the tool tab
            tab?.setChecked(toolData.enabled);    
        }

        if(toolData.enabled && getDirtyBit(toolData.id)) {
            // Reset the dirty bit and proceed the tool to process         
            setDirtyBit(toolData.id, false);
            handleToolChange(toolData);
        }
        else if(updatingManagerLock) {
            setEnabledToolQueue(queue => [...queue, [toolData.id, toolData.enabled]]);
        }
        else {
            tool.setEnabled(toolData.enabled);
            tool.getProps().enabled = toolData.enabled;
        }
        
    };

    /**
     * Initializes the tool internal reprezentation from React element
     */
    const initTool = (toolData: IToolData, type: IReactElement) => {
        
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
    const processToolUpdate = (toolData: IToolData, type: IReactElement, currentTool: IToolInfo, property?: string) => {
        
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
        const rerenderTool = toolData.enabled || property === ID_PROP || !currentTool.isLayerTool;

        if(sidebarTool !== undefined && sidebarTool.getProps().enabled && rerenderTool) {

            // Process all the sidebar tabs so the tool tab reflects changes in tool properties
            // Ref call will result in calling 'handleToolChange' method directly from Sidebar component with updated data
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

        // Remove current tool from manager
        manager.removeById(currentTool.id);
        
        // Add tool with changed properties
        const processedTool = getToolInstance(type, toolData);
        manager.add(processedTool);        
        
        // Re-render only when the sidebar tool is supposed to be enabled
        if(toolData.enabled) {
            emitRerender();
        }
        // Remove sidebar elements from the leaflet map if sidebar has been disabled (no need for rerender)
        else if(tool.isEnabled() !== toolData.enabled) {
            const sidebar = tool.getState().getSidebar()?.remove();

            if(sidebar) {   
                tool.getState().setSidebar(sidebar);
            }
        }
    };

    /**
     * Handler for the ontToolChange() callback
     * Resolves tool manager initialization and tool components updates
     */
    const handleToolChange = (toolData: IToolData, property?: string) => {

        // Get original react element of the tool
        const toolElement = childrenExtended?.find(el => el.props.id === toolData.id);
        
        if(React.isValidElement(toolElement))
        {
            // Initialization: All tools were not initialized yet
            if(manager.getAll().length < childrenCount)
            {
                initTool(toolData, toolElement.type);
                return;
            }
            
            // Updating: All tools were loaded, handler was triggered by updating tool's properties
            else {

                const toolId = property === ID_PROP ? toolData.prevId : toolData.id;
                const currentTool = manager.getById(toolId) as IMapTool;

                // If tool is missing in the manager, it means that is being processed (removed and added new) by different 
                // process and will be re-rendered with the current props, therefore this call can be cancelled
                // Multiple unnecessary calls are caused by using functions as props values
                if(currentTool === undefined) {
                    return;
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
                                toolSetEnabled(toolData);        
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
    React.Children.forEach(props.children, (child, index) => {
    
        // Ignore components that are not supported (= provided by this library)
        if(!React.isValidElement(child)) {
            return;
        }
        else if (!supportedComponentTypes.includes(child.type)) {   
            console.warn(`Following element is not supported and will be skipped.`);
            console.warn(child);            
            return;
        }
        else if(childrenExtended.some(el => (el as ReactElement).props.id === (child as ReactElement).props.id))
        {
            console.warn(`Component with the id "${(child as ReactElement).props.id}" is already defined and duplicate will be skipped.`);
            return;
        }
       
        const toolProps = {...child.props};

        toolProps.key = index;
        toolProps.onToolChange = handleToolChange;

        // Add ref to SidebarTool
        if(child.type === SidebarTool) {
            toolProps.ref = sidebarRef;
        }

        childrenExtended.push(React.cloneElement(child, toolProps, child.props.children));
    });

    // Get count of all tools configured by user
    const childrenCount = useMemo(() : number => React.Children.count(childrenExtended)
    , [childrenExtended]);
    
    // Execute when user changes number of ToolGroup child using the conditional rendering
    useDidUpdateEffect(() => {
        const validIds = React.Children.map(childrenExtended, (child) => child.props.id);
        const managerIds = manager.getIds();

        if((managerIds.length != validIds.length)) {

            const invalidIds = managerIds.filter(id => !validIds.includes(id));            
            invalidIds.forEach(id => manager.removeById(id));
        }

        rerender();
    }, [childrenCount]);

    // Check on start if ToolGrorup has any valid child elements
    useEffect(() => {
        // Tool component are not specified -> render map with basic props only 
        if(!childrenExtended?.some((el : ReactElement) => supportedComponentTypes.includes(el.type))) {
            rerender();
        }
    }, []);

    return <>{childrenExtended}</>;
});