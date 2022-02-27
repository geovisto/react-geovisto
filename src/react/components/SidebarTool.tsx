import React, { useEffect } from 'react'
import { ISidebarTab, ISidebarTabProps, ISidebarToolProps, SidebarTab } from '../..';
import { useGeovistoContext } from '../context/GeovistoContext';
import { IToolDataProps } from './Types';

// Exclude undesirable properties
// type ISidebarToolPropsExtended = Omit<ISidebarToolProps, "tabs">

// Exclude undesirable properties
type  ISidebarToolDataProps<T> = IToolDataProps<Omit<T, "tabs">>


export const SidebarTool: React.FC<ISidebarToolDataProps<ISidebarToolProps>> = (props) => {

    // const context = useGeovistoContext();

    let usedTabs : [ string | undefined, ISidebarTab ][] = [];    
    
    useEffect(() => {

        console.log(props);

        React.Children.map(props.children, (child, index) => {
        
            if (React.isValidElement(child)) 
            {
                let tabProps = {...child.props};
                
                // export and delete additional property used to identify the tool
                let toolId = child.props.tool as string;
                delete tabProps.tool;
    
                usedTabs.push([toolId, new SidebarTab(tabProps as ISidebarTabProps)]);
            }
    
            return;
            // return React.isValidElement(child) ? new SidebarTab(child.props) : null;
        });
        
        
        if(usedTabs !== undefined && usedTabs!.length > 0)
        {
            props.data.tabs = usedTabs;
            
            // let sidebarProps = {...props}
            // delete sidebarProps.children;
            // context.setSidebar({...sidebarProps, tabs: usedTabs!});
        } 


        console.log("[SideBar] Rendered");
    }, []);

    
    return <>{props.children}</>;
}