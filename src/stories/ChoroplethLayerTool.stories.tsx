// Storybook
import { ComponentStory, ComponentMeta } from '@storybook/react';

// React
import React from "react";

// Geovisto
import { ISidebarTabProps } from 'geovisto-sidebar';
import { IChoroplethLayerToolDimensions } from 'geovisto-layer-choropleth';
import { IGeoDataManager } from 'geovisto';

// Internal imports
import '../react/Constants';
import { SidebarTab, SidebarTool, ChoroplethLayerTool } from '../react/components';
import { ISidebarTabDataProps } from '../react/types';

// Styles
import '../styles/common.scss';

// Stories internal helper components
import { ExportMapWrapper } from '../storiesHelpers/ExportMapWrapper';


const ChoroplethLayerToolDemo = (props: IChoroplethLayerToolDemoProps) : JSX.Element => {

    const extendedProps = {
        mapId: 'geovisto-map-choropleth-demo',
        ...props
    }

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
                geoData={props.toolGeoData}
                dimensions={props.toolDimensions}
            />
        </ExportMapWrapper>
    );
};

export default {
    component: ChoroplethLayerToolDemo,
    title: 'Tools/ChoroplethLayer Tool',
    argTypes: {
        sidebarToolEnabled: {
            name: "SidebarTool: enabled",
            description: "Enabled property of the SidebarTool instance.",
        },
        sidebarTabTool: {
            name: "SidebarTab - ChoroplethLayerTool",
            description: "Properties of the sidebar tab of the ChoroplethLayerTool.",
        },
        showBaseTileLayerMap: {
            name: "Base tile layer: enabled",
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
        dimensions: {
            name: "Dimensions",
            description: "Dimensions property of the ChoroplethLayerTool instance.",
        },
        geoData: {
            name: "GeoData",
            description: "GeoData property of the ChoroplethLayerTool instance.",
        }
    },
} as ComponentMeta<typeof ChoroplethLayerToolDemo>;

export type IChoroplethLayerToolDemoProps = {
    toolId: string;
    toolEnabled: boolean;
    toolName: string;
    toolLabel: string;
    toolDimensions: IChoroplethLayerToolDimensions;
    toolGeoData: IGeoDataManager;
    sidebarToolEnabled: boolean;
    sidebarTabTool: ISidebarTabDataProps<ISidebarTabProps>;
    showBaseTileLayerMap: boolean;
} 

const Template : ComponentStory<typeof ChoroplethLayerToolDemo> = args => <ChoroplethLayerToolDemo {...args} />

export const GeovistoChoroplethLayerTool = Template.bind({});

GeovistoChoroplethLayerTool.storyName = 'Choropleth Layer Tool';
GeovistoChoroplethLayerTool.args = {
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
