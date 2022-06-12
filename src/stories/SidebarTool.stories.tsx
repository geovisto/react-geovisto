// Storybook
import { ComponentStory, ComponentMeta } from '@storybook/react';

// React
import React from "react";

// Internal imports
import { ChoroplethLayerTool, SidebarTab, SidebarTool } from '../react/components';

// Styles
import '../styles/common.scss';

// Stories internal helper components
import { ExportMapWrapper } from '../storiesHelpers/ExportMapWrapper';

// Data
import demo1 from '../../static/data/demo1.json';

const SidebarToolDemo = (props: ISidebarToolDemoProps) : JSX.Element => {

    const extendedProps = {
        mapId: 'geovisto-map-sidebar-demo',
        data: demo1,
        ...props
    };

    return (
        <ExportMapWrapper {...extendedProps}>
            <SidebarTool 
                id={props.toolId}
                enabled={props.toolEnabled}
                label={props.toolLabel}
            >
                <SidebarTab
                    tool={props.sidebarTabTool}
                    enabled={props.sidebarTabEnabled}
                    icon={props.sidebarTabIcon}
                    checkButton={props.sidebarTabCheckButton}
                    name={props.sidebarTabName}
                />
            </SidebarTool>
            <ChoroplethLayerTool 
                id='geovisto-tool-layer-choropleth' 
                enabled={true}
                name='Choropleth layer'
            />
        </ExportMapWrapper>
    );
};

export default {
    component: SidebarToolDemo,
    title: 'Tools/Sidebar Tool',
    argTypes: {
        showBaseTileLayerMap: {
            name: "Base tile layer: Enabled",
            description: "Toggles the base tiles layer.",
        },
        toolId: {
            name: "SidebarTool: Id",
            description: "Id property of the SidebarTool instance.",
        },
        toolLabel: {
            name: "SidebarTool: Label",
            description: "Label property of the SidebarTool instance.",
        },
        toolEnabled: {
            name: "SidebarTool: Enabled",
            description: "Enabled property of the SidebarTool instance.",
        },
        sidebarTabTool: {
            name: "SidebarTab: ToolId",
            description: "ToolId property of the SidebarTab instance.",
        },
        sidebarTabEnabled: {
            name: "SidebarTab: Enabled",
            description: "Enabled property of the SidebarTab instance.",
        },
        sidebarTabName: {
            name: "SidebarTab: Name",
            description: "Name property of the SidebarTab instance.",
        },
        sidebarTabIcon: {
            name: "SidebarTab: Icon",
            description: "Icon property of the SidebarTab instance.",
        },
        sidebarTabCheckButton: {
            name: "SidebarTab: CheckButton",
            description: "CheckButton property of the SidebarTab instance.",
        }
    },
} as ComponentMeta<typeof SidebarToolDemo>;

export type ISidebarToolDemoProps = {
    toolId: string;
    toolEnabled: boolean;
    toolLabel: string;
    sidebarToolEnabled: boolean;
    sidebarTabTool: string;
    showBaseTileLayerMap: boolean;
    sidebarTabEnabled: boolean;
    sidebarTabName: string;
    sidebarTabIcon: string;
    sidebarTabCheckButton: boolean;
} 

const Template : ComponentStory<typeof SidebarToolDemo> = args => <SidebarToolDemo {...args} />

export const GeovistoSidebarToolStory = Template.bind({});

GeovistoSidebarToolStory.storyName = 'Sidebar Tool';
GeovistoSidebarToolStory.args = {
    toolEnabled: true,
    toolId: 'geovisto-sidebar-tool-map',
    toolLabel: 'Sidebar Tool label',
    sidebarTabTool: 'geovisto-tool-layer-choropleth',
    sidebarTabEnabled: true,
    sidebarTabName: 'Choropleth layer settings',
    sidebarTabIcon: '<i class="fa fa-th-large"></i>',
    sidebarTabCheckButton: true,
    showBaseTileLayerMap: true
}
