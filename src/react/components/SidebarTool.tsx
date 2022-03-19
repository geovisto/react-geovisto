import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import {SidebarTab as SidebarTabType}  from '.';
import { ISidebarTab, ISidebarTabProps, ISidebarToolProps, SidebarTab } from '../..';
import { IToolData, IToolDataProps } from './Types';

// FIXME: remove export?
// Exclude undesirable properties
export type  ISidebarToolDataProps<T> = IToolDataProps<Omit<T, "tabs">>;

// Handle ref calls from parent
export type ISidebarToolHandle =  {
    getProcessedTabs: () => void;
}

type ISidebarTabs = [ string | undefined, ISidebarTab ][];


export const SidebarTool = forwardRef<ISidebarToolHandle, ISidebarToolDataProps<ISidebarToolProps>>((props, ref) : JSX.Element => {

    // Emitter from parent component to process all tabs 
    useImperativeHandle(ref, () => ({

        getProcessedTabs() {
          processTabs();
        }
    
    }));

    // Process all children elements 
    const processTabs = () => {

        const usedTabs: ISidebarTabs = [];    
        
        React.Children.forEach(props.children, (child, index) => {
        
            if (!React.isValidElement(child) || child.type !== SidebarTabType) {
                return;
            }

            const tabProps = {...child.props};
            tabProps.key = index;

            // export and delete additional property used to identify the tool
            const toolId = child.props.tool as string;
            delete tabProps.tool;

            // Skip the tab if some tab for the same tool was already defined
            if(usedTabs.some(tab => (tab[0] as string) === toolId)) {
                console.warn(`Duplicity: SidebarTab with id '${toolId}' is already defined and will be skipped`);
                return;
            }

            usedTabs.push([toolId, new SidebarTab(tabProps as ISidebarTabProps)]);
        });
        
        props.onToolChange?.({...props, tabs: usedTabs});
    }; 


    const handleToolChange = (toolData: IToolData, property: string) => {
        // TODO: When SidebarTab is Changed
        processTabs();
    };

    // Run on component mount
    useEffect(() => {
        processTabs();
        
    }, [props.id,
        props.icon,
        props.label,
        // Leaflet map needs to be re-rendered when sidebar enabled state is modified
        props.enabled]);

    // Run on component update
    // useDidUpdateEffect(() => {
    //     props.onToolChange!({...props}, ENABLED_PROP);

    // },[props.enabled]);


    /**
     * Validate all children and add onToolChange callback
     */
    const childrenExtended = React.Children.map(props.children, (child, index) => {
    
        // Only SidebarTab component is expected as a children
        if (!React.isValidElement(child) || child.type !== SidebarTabType) {
            return; 
        } 

        const tabProps = {...child.props};
        tabProps.key = index;
        tabProps.onToolChange = handleToolChange;

        return React.cloneElement(child, tabProps, child.props.children);
    });

    return <>{childrenExtended}</>;
});