// Storybook
import { ComponentStory, ComponentMeta } from '@storybook/react';

// React
import React from "react";

// Geovisto
import { ISidebarTabProps } from 'geovisto-sidebar';
import { IMarkerLayerToolDimensions } from 'geovisto-layer-marker';
import { IGeoDataManager } from 'geovisto';

// Internal imports
import '../react/Constants';
import { SidebarTab, SidebarTool, MarkerLayerTool } from '../react/components';
import { ISidebarTabDataProps } from '../react/types';

// Styles
import '../styles/common.scss';

// Stories internal helper components
import { ExportMapWrapper } from '../storiesHelpers/ExportMapWrapper';


const MarkerLayerToolDemo = (props: IMarkerLayerToolDemoProps) : JSX.Element => {

    const extendedProps = {
        mapId: 'geovisto-map-marker-demo',
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
            <MarkerLayerTool 
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
    component: MarkerLayerToolDemo,
    title: 'Tools/MarkerLayer Tool',
    argTypes: {
        sidebarToolEnabled: {
            name: "SidebarTool: enabled",
            description: "Enabled property of the SidebarTool instance.",
        },
        sidebarTabTool: {
            name: "SidebarTab - MarkerLayerTool",
            description: "Properties of the sidebar tab of the MarkerLayerTool.",
        },
        showBaseTileLayerMap: {
            name: "Base tile layer: enabled",
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
        dimensions: {
            name: "Dimensions",
            description: "Dimensions property of the MarkerLayerTool instance.",
        },
        geoData: {
            name: "GeoData",
            description: "GeoData property of the MarkerLayerTool instance.",
        }
    },
} as ComponentMeta<typeof MarkerLayerToolDemo>;

export type IMarkerLayerToolDemoProps = {
    toolId: string;
    toolEnabled: boolean;
    toolName: string;
    toolLabel: string;
    toolDimensions: IMarkerLayerToolDimensions;
    toolGeoData: IGeoDataManager;
    sidebarToolEnabled: boolean;
    sidebarTabTool: ISidebarTabDataProps<ISidebarTabProps>;
    showBaseTileLayerMap: boolean;
} 

const Template : ComponentStory<typeof MarkerLayerToolDemo> = args => <MarkerLayerToolDemo {...args} />

export const GeovistoMarkerLayerTool = Template.bind({});

GeovistoMarkerLayerTool.storyName = 'Marker Layer Tool';
GeovistoMarkerLayerTool.args = {
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
