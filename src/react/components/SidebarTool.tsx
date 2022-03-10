import React, { useEffect } from 'react'
import { ISidebarTab, ISidebarTabProps, ISidebarToolProps, SidebarTab } from '../..';
import { useGeovistoContext } from '../context/GeovistoContext';
import { IToolData, IToolDataProps } from './Types';

// FIXME: remove export?
// Exclude undesirable properties
export type  ISidebarToolDataProps<T> = IToolDataProps<Omit<T, "tabs">>

type ISidebarTabs = [ string | undefined, ISidebarTab ][];

// export const SidebarTool = (props : ISidebarToolDataProps<ISidebarToolProps>) : JSX.Element  => {
export const SidebarTool = (props: ISidebarToolDataProps<ISidebarToolProps>) : JSX.Element => {

    // const context = useGeovistoContext();

    const processTabs = () => {

        let usedTabs: ISidebarTabs = [];    
        
        React.Children.map(props.children, (child, index) => {
        
            if (!React.isValidElement(child)) 
                return;

            let tabProps = {...child.props};
            
            // export and delete additional property used to identify the tool
            let toolId = child.props.tool as string;
            delete tabProps.tool;

            usedTabs.push([toolId, new SidebarTab(tabProps as ISidebarTabProps)]);
        });
        
        props.onToolChange!({...props, tabs: usedTabs});
    } 


    const handleToolChange = (toolData: IToolData, property: string) => {
        processTabs();
    };


    useEffect(() => {
       processTabs();
    }, []);


    const childrenExtended = React.Children.map(props.children, (child, index) => {
    
        if (!React.isValidElement(child)) 
            return; 

        let newProps = {...child.props};
        newProps.onToolChange = handleToolChange

        return React.cloneElement(child, newProps, child.props.children);
    });



    // Run on component update
    // useDidMountEffect(() => {
    //     props.onToolChange!(props);

    // },[props.children]);

    
    return <>{childrenExtended}</>;
}