import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import {SidebarTab as SidebarTabType}  from '.';
import { ISidebarTab, ISidebarTabProps, ISidebarToolProps, SidebarTab } from '../..';
import { useGeovistoContext } from '../context/GeovistoContext';
import { useDidUpdateEffect } from './Hooks';
import { ENABLED_PROP, IToolData, IToolDataProps } from './Types';

// FIXME: remove export?
// Exclude undesirable properties
export type  ISidebarToolDataProps<T> = IToolDataProps<Omit<T, "tabs">>;

// Handle ref calls from parent
export type ISidebarToolHandle =  {
    getProcessedTabs: () => void;
}

type ISidebarTabs = [ string | undefined, ISidebarTab ][];

// export const SidebarTool = (props : ISidebarToolDataProps<ISidebarToolProps>) : JSX.Element  => {
export const SidebarTool = forwardRef<ISidebarToolHandle, ISidebarToolDataProps<ISidebarToolProps>>((props, ref) : JSX.Element => {

    // const context = useGeovistoContext();

    useImperativeHandle(ref, () => ({

        getProcessedTabs() {
          processTabs();
        }
    
    }));

    // Process all children elements 
    const processTabs = () => {

        let usedTabs: ISidebarTabs = [];    
        
        React.Children.forEach(props.children, (child, index) => {
        
            if (!React.isValidElement(child) || child.type !== SidebarTabType) {
                return;
            }

            let tabProps = {...child.props};
            
            // export and delete additional property used to identify the tool
            let toolId = child.props.tool as string;
            delete tabProps.tool;

            // Skip the tab if some tab for the same tool was already defined
            if(usedTabs.some(tab => (tab[0] as string) === toolId)) {
                console.error(`Duplicity: SidebarTab with id '${toolId}' is already defined`);
                return;
            }

            usedTabs.push([toolId, new SidebarTab(tabProps as ISidebarTabProps)]);
        });
        
        props.onToolChange!({...props, tabs: usedTabs});
    } 


    const handleToolChange = (toolData: IToolData, property: string) => {
        processTabs();
    };


    // Run on component mount
    useEffect(() => {

       processTabs();

    }, [props.id,
        props.icon,
        props.label,]);

    // Run on component update
    useDidUpdateEffect(() => {
        props.onToolChange!(props, ENABLED_PROP);

    },[props.enabled]);


    /**
     * Validate all children and add onToolChange callback
     */
    const childrenExtended = React.Children.map(props.children, (child, index) => {
    
        // Only SidebarTab component is expected as a children
        if (!React.isValidElement(child) || child.type !== SidebarTabType) {
            return; 
        } 

        let newProps = {...child.props};
        newProps.onToolChange = handleToolChange

        return React.cloneElement(child, newProps, child.props.children);
    });

    return <>{childrenExtended}</>;
});

