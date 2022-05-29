// Storybook
import { ComponentStory, ComponentMeta } from '@storybook/react';

// React
import React from "react";

// Geovisto
import { ISidebarTabProps } from 'geovisto-sidebar';

// Internal imports
import '../react/Constants';
import { SidebarTab, SidebarTool, ChoroplethLayerTool } from '../react/components';
import { ISidebarTabDataProps } from '../react/types';

// Styles
import '../styles/common.scss';

// Stories internal helper components
import { ExportMapWrapper } from '../storiesHelpers/ExportMapWrapper';

// Data
import covidCzechDistricts from '../../static/data/covidCzechDistricts.json';

// Config
import czDefaultMapPosition from '../../static/config/defaultPosition/config-czDefaultPosition.json';

const ChoroplethLayerToolDemo = (props: IChoroplethLayerToolDemoProps) : JSX.Element => {

    const extendedProps = {
        mapId: 'geovisto-map-choropleth-demo',
        data: covidCzechDistricts,
        config: props.defaultMapPosition ? czDefaultMapPosition : undefined,
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
            <ChoroplethLayerTool 
                id={props.toolId}
                enabled={props.toolEnabled}
                name={props.toolName}
                label={props.toolLabel}
            />
        </ExportMapWrapper>
    );
};

export default {
    component: ChoroplethLayerToolDemo,
    title: 'Tools/Choropleth Layer Tool',
    argTypes: {
        sidebarToolEnabled: {
            name: "SidebarTool: Enabled",
            description: "Enabled property of the SidebarTool instance.",
        },
        sidebarTabTool: {
            name: "SidebarTab - ChoroplethLayerTool",
            description: "Properties of the sidebar tab of the ChoroplethLayerTool.",
        },
        showBaseTileLayerMap: {
            name: "Base tile layer: Enabled",
            description: "Toggles the base tiles layer.",
        },
        toolId: {
            name: "Id",
            description: "Id property of the ChoroplethLayerTool instance.",
        },
        toolName: {
            name: "Name",
            description: "Name property of the ChoroplethLayerTool instance.",
        },
        toolLabel: {
            name: "Label",
            description: "Label property of the ChoroplethLayerTool instance.",
        },
        toolEnabled: {
            name: "Enabled",
            description: "Enabled property of the ChoroplethLayerTool instance.",
        },
        defaultMapPosition: {
            name: "Default map position (CZ):",
            description: "Enables/Disables config with the center of the map set on Czech republic.",
        }
    },
} as ComponentMeta<typeof ChoroplethLayerToolDemo>;

export type IChoroplethLayerToolDemoProps = {
    defaultMapPosition: boolean,
    toolId: string;
    toolEnabled: boolean;
    toolName: string;
    toolLabel: string;
    sidebarToolEnabled: boolean;
    sidebarTabTool: ISidebarTabDataProps<ISidebarTabProps>;
    showBaseTileLayerMap: boolean;
} 

const Template : ComponentStory<typeof ChoroplethLayerToolDemo> = args => <ChoroplethLayerToolDemo {...args} />

export const GeovistoChoroplethLayerToolStory = Template.bind({});

GeovistoChoroplethLayerToolStory.storyName = 'Choropleth Layer Tool';
GeovistoChoroplethLayerToolStory.args = {
    defaultMapPosition: true,
    toolEnabled: true,
    toolId: 'geovisto-choropleth-layer-tool-map',
    toolName: 'Choropleth Layer Tool',
    toolLabel: 'Choropleth Layer Tool label',
    sidebarToolEnabled: true,
    sidebarTabTool: {
        tool: 'geovisto-choropleth-layer-tool-map',
        enabled: true,
        name: 'Choropleth layer settings',
        icon: '<i class="fa fa-th-large"></i>',
        checkButton: true
    },
    showBaseTileLayerMap: true
}
