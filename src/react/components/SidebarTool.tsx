import React, { Children, useEffect, useState } from 'react'
import { Geovisto, ISidebarTab, ISidebarTabProps, ISidebarToolConfig, ISidebarToolProps, SidebarTab } from '../..';
import { useGeovistoContext } from '../context/GeovistoContext';
import { ISidebarTabPropsExtended } from './SidebarTab';

// interface ISidebarToolPropsExtended extends Omit<ISidebarToolProps, "tabs">

// Exclude undesirable properties
type ISidebarToolPropsExtended = Omit<ISidebarToolProps, "tabs">

export const SidebarTool: React.FC<ISidebarToolPropsExtended> = (props) => {


    const context = useGeovistoContext();

    // (props as any).ahoj = "ahoj";

    let usedTabs : [ string | undefined, ISidebarTab ][] = [];
    // const [sidebar, setSidebar] = useState<ISidebarToolProps>();

    console.log(props.children ? props.children : "undefined" );

    // const count = React.Children.count(children);
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
    

    
    useEffect(() => {

        let sidebarProps = {...props}
        delete sidebarProps.children;

        if(usedTabs !== undefined && usedTabs!.length > 0)
        {
            context.setSidebar({...sidebarProps, tabs: usedTabs!});
        } 


        console.log("[SideBar] Rendered");
    }, []);

    
    return <>{props.children}</>;
}