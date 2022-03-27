import React, { forwardRef, useImperativeHandle } from 'react';
import { SidebarTab as SidebarTabType }  from '.';
import { ISidebarTab, ISidebarTabProps, ISidebarToolProps, SidebarTab } from '../..';
import { useDidToolIdUpdate, useToolEffect } from '../Hooks';
import { IToolData, IToolDataProps } from '../Types';

// FIXME: remove export?
// Exclude undesirable properties
export type  ISidebarToolDataProps<T> = IToolDataProps<Omit<T, "tabs">>;

// Handle ref calls from parent
export type ISidebarToolHandle =  {
    getTabs: () => void;
}

type ISidebarTabs = [ string | undefined, ISidebarTab ][];


export const SidebarTool = forwardRef<ISidebarToolHandle, ISidebarToolDataProps<ISidebarToolProps>>((props, ref) : JSX.Element => {
    
    /**
     * Process all sidebar tabs and create their internal representation
     */
    const getProcessedTabs = () : ISidebarTabs => {

        const processedTabs: ISidebarTabs = [];    
        
        React.Children.forEach(props.children, (child, index) => {
        
            if (!React.isValidElement(child) || child.type !== SidebarTabType) {
                return;
            }

            const tabProps = {...child.props};
            tabProps.key = index;

            // Export and delete additional property used to identify the tool
            const toolId = child.props.tool as string;
            delete tabProps.tool;

            // Skip the tab if some tab for the same tool was already defined
            if(processedTabs.some(tab => (tab[0] as string) === toolId)) {
                console.warn(`Duplicity: SidebarTab with id '${toolId}' is already defined and will be skipped`);
                return;
            }

            processedTabs.push([toolId, new SidebarTab(tabProps as ISidebarTabProps)]);
        });
        
        // setTabs(processedTabs);
        return processedTabs;
    }; 

    /**
     * Get current formed sidebar props 
     */
    const formSidebarProps = () : IToolDataProps<ISidebarToolProps> => {
        return {...props, tabs: getProcessedTabs()};
    }; 
    
    /**
     * Reacts to changes in any of the sidebar tabs
     */
    const handleToolChange = (toolData: IToolData, property?: string) => {
        props.onToolChange?.(formSidebarProps());
    };
    
    // Run on component mount or any dependency update
    useToolEffect(formSidebarProps(), [
        props.icon,
        props.label,
        // Leaflet map needs to be re-rendered when sidebar enabled state is modified
        props.enabled]);

    // Run on 'id' property update
    useDidToolIdUpdate(formSidebarProps(), [props.id]);

    // Emitter from parent component to process all tabs 
    useImperativeHandle(ref, () => ({
        getTabs : () => props.onToolChange?.(formSidebarProps())
    }));

    /**
     * Validate all children and add 'onToolChange' callback
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