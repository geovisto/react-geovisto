// Storybook
import { ComponentStory, ComponentMeta } from '@storybook/react';

// React
import React from "react";

// Geovisto
import { ISidebarTabProps } from 'geovisto-sidebar';

// Internal imports
import '../react/Constants';
import { SidebarTab, SidebarTool, MarkerLayerTool } from '../react/components';
import { ISidebarTabDataProps } from '../react/types';

// Styles
import '../styles/common.scss';

// Stories internal helper components
import { ExportMapWrapper } from '../storiesHelpers/ExportMapWrapper';

// Data
import covidCzechDistrictsCumulative from '../../static/data/covidCzechDistrictsCumulative.json';

// Config
import czDefaultMapPosition from '../../static/config/defaultPosition/config-czDefaultPosition.json';

const MarkerLayerToolDemo = (props: IMarkerLayerToolDemoProps) : JSX.Element => {

    const extendedProps = {
        mapId: 'geovisto-map-marker-demo',
        data: covidCzechDistrictsCumulative,
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
            <MarkerLayerTool 
                id={props.toolId}
                enabled={props.toolEnabled}
                name={props.toolName}
                label={props.toolLabel}
            />
        </ExportMapWrapper>
    );
};

export default {
    component: MarkerLayerToolDemo,
    title: 'Tools/Marker Layer Tool',
    argTypes: {
        sidebarToolEnabled: {
            name: "SidebarTool: Enabled",
            description: "Enabled property of the SidebarTool instance.",
        },
        sidebarTabTool: {
            name: "SidebarTab - MarkerLayerTool",
            description: "Properties of the sidebar tab of the MarkerLayerTool.",
        },
        showBaseTileLayerMap: {
            name: "Base tile layer: Enabled",
            description: "Toggles the base tiles layer.",
        },
        toolId: {
            name: "Id",
            description: "Id property of the MarkerLayerTool instance.",
        },
        toolName: {
            name: "Name",
            description: "Name property of the MarkerLayerTool instance.",
        },
        toolLabel: {
            name: "Label",
            description: "Label property of the MarkerLayerTool instance.",
        },
        toolEnabled: {
            name: "Enabled",
            description: "Enabled property of the MarkerLayerTool instance.",
        },
        defaultMapPosition: {
            name: "Default map position (CZ):",
            description: "Enables/Disables config with the center of the map set on Czech republic.",
        }
    },
} as ComponentMeta<typeof MarkerLayerToolDemo>;

export type IMarkerLayerToolDemoProps = {
    defaultMapPosition: boolean,
    toolId: string;
    toolEnabled: boolean;
    toolName: string;
    toolLabel: string;
    sidebarToolEnabled: boolean;
    sidebarTabTool: ISidebarTabDataProps<ISidebarTabProps>;
    showBaseTileLayerMap: boolean;
} 

const Template : ComponentStory<typeof MarkerLayerToolDemo> = args => <MarkerLayerToolDemo {...args} />

export const GeovistoMarkerLayerToolStory = Template.bind({});

GeovistoMarkerLayerToolStory.storyName = 'Marker Layer Tool';
GeovistoMarkerLayerToolStory.args = {
    defaultMapPosition: true,
    toolEnabled: true,
    toolId: 'geovisto-marker-layer-tool-map',
    toolName: 'Marker Layer Tool',
    toolLabel: 'Marker Layer Tool label',
    sidebarToolEnabled: true,
    sidebarTabTool: {
        tool: 'geovisto-marker-layer-tool-map',
        enabled: true,
        name: 'Marker layer settings',
        icon: '<i class="fa fa-map-marker"></i>',
        checkButton: true
    },
    showBaseTileLayerMap: true
}
