// Storybook
import { ComponentStory, ComponentMeta } from '@storybook/react';

// React
import React from "react";

// Geovisto
import { ISidebarTabProps } from 'geovisto-sidebar';

// Internal imports
import '../react/Constants';
import { SidebarTab, SidebarTool, ConnectionLayerTool } from '../react/components';
import { ISidebarTabDataProps } from '../react/types';

// Styles
import '../styles/common.scss';

// Stories internal helper components
import { ExportMapWrapper } from '../storiesHelpers/ExportMapWrapper';

// Data
import demo1 from '../../static/data/demo1.json';

const ConnectionLayerToolDemo = (props: IConnectionLayerToolDemoProps) : JSX.Element => {

    const extendedProps = {
        mapId: 'geovisto-map-connection-demo',
        data: demo1,
        ...props
    };

    return (
        <ExportMapWrapper {...extendedProps}>
            <SidebarTool 
                id='geovisto-tool-sidebar'
                enabled={props.sidebarToolEnabled}
            >
                <SidebarTab
                    {...props.sidebarTabTool}
                />
            </SidebarTool>
            <ConnectionLayerTool 
                id={props.toolId}
                enabled={props.toolEnabled}
                name={props.toolName}
                label={props.toolLabel}
            />
        </ExportMapWrapper>
    );
};

export default {
    component: ConnectionLayerToolDemo,
    title: 'Tools/Connection Layer Tool',
    argTypes: {
        sidebarToolEnabled: {
            name: "SidebarTool: enabled",
            description: "Enabled property of the SidebarTool instance.",
        },
        sidebarTabTool: {
            name: "SidebarTab - ConnectionLayerTool",
            description: "Properties of the sidebar tab of the ConnectionLayerTool.",
        },
        showBaseTileLayerMap: {
            name: "Base tile layer: enabled",
            description: "Toggles the base tiles layer.",
        },
        toolId: {
            name: "Id",
            description: "Id property of the ConnectionLayerTool instance.",
        },
        toolName: {
            name: "Name",
            description: "Name property of the ConnectionLayerTool instance.",
        },
        toolLabel: {
            name: "Label",
            description: "Label property of the ConnectionLayerTool instance.",
        },
        toolEnabled: {
            name: "Enabled",
            description: "Enabled property of the ConnectionLayerTool instance.",
        }
    },
} as ComponentMeta<typeof ConnectionLayerToolDemo>;

export type IConnectionLayerToolDemoProps = {
    toolId: string;
    toolEnabled: boolean;
    toolName: string;
    toolLabel: string;
    sidebarToolEnabled: boolean;
    sidebarTabTool: ISidebarTabDataProps<ISidebarTabProps>;
    showBaseTileLayerMap: boolean;
} 

const Template : ComponentStory<typeof ConnectionLayerToolDemo> = args => <ConnectionLayerToolDemo {...args} />

export const GeovistoConnectionLayerToolStory = Template.bind({});

GeovistoConnectionLayerToolStory.storyName = 'Connection Layer Tool';
GeovistoConnectionLayerToolStory.args = {
    toolEnabled: true,
    toolId: 'geovisto-connection-layer-tool-map',
    toolName: 'Connection Layer Tool',
    toolLabel: 'Connection Layer Tool label',
    sidebarToolEnabled: true,
    sidebarTabTool: {
        tool: 'geovisto-connection-layer-tool-map',
        enabled: true,
        name: 'Connection layer settings',
        icon: '<i class="fa fa-road"></i>',
        checkButton: true
    },
    showBaseTileLayerMap: true
}
