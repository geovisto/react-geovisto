// Storybook
import { ComponentStory, ComponentMeta } from '@storybook/react';

// React
import React from "react";

//Leaflet
import { LatLngBoundsLiteral } from 'leaflet';

// Geovisto
import { ISidebarTabProps } from 'geovisto-sidebar';

// Internal imports
import '../react/Constants';
import { SidebarTab, SidebarTool, CustomTool } from '../react/components';
import { ISidebarTabDataProps } from '../react/types';

// Styles
import '../styles/common.scss';

// Stories internal helper components
import { ExportMapWrapper } from '../storiesHelpers/ExportMapWrapper';
import { IImageLayerToolProps, ImageLayerTool } from '../storiesHelpers/imageLayerTool';

// Config
import imgDefaultMapPosition from '../../static/config/defaultPosition/config-imgDefaultPosition.json';

const CustomToolDemo = (props: ICustomToolDemoProps) : JSX.Element => {

    const extendedProps = {
        mapId: 'geovisto-map-custom-demo',
        config: props.defaultMapPosition ? imgDefaultMapPosition : undefined,
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
            <CustomTool 
                id={props.toolId}
                enabled={props.toolEnabled}
                name={props.toolName}
                label={props.toolLabel}
                url={props.toolUrl}
                bounds={props.toolBounds}
                createTool={(props: IImageLayerToolProps) => new ImageLayerTool(props)}
            />
        </ExportMapWrapper>
    );
};

export default {
    component: CustomToolDemo,
    title: 'Tools/Custom Tool',
    argTypes: {
        sidebarToolEnabled: {
            name: "SidebarTool: Enabled",
            description: "Enabled property of the SidebarTool instance.",
        },
        sidebarTabTool: {
            name: "SidebarTab - CustomTool",
            description: "Properties of the sidebar tab of the CustomTool",
        },
        showBaseTileLayerMap: {
            name: "Base tile layer: Enabled",
            description: "Toggles the base tiles layer.",
        },
        toolId: {
            name: "Id",
            description: "Id property of the CustomTool instance.",
        },
        toolName: {
            name: "Name",
            description: "Name property of the CustomTool instance.",
        },
        toolLabel: {
            name: "Label",
            description: "Label property of the CustomTool instance.",
        },
        toolEnabled: {
            name: "Enabled",
            description: "Enabled property of the CustomTool instance.",
        },
        toolUrl: {
            name: "Url",
            description: "Url property of the CustomTool instance.",
        },
        toolBounds: {
            name: "Boundaries",
            description: "Bounds property of the CustomTool instance.",
        },
        defaultMapPosition: {
            name: "Default map position:",
            description: "Enables/Disables config with the position of the map set to the image.",
        }
    },
} as ComponentMeta<typeof CustomToolDemo>;

export type ICustomToolDemoProps = {
    defaultMapPosition: boolean,
    toolId: string;
    toolEnabled: boolean;
    toolName: string;
    toolLabel: string;
    toolUrl: string;
    toolBounds: LatLngBoundsLiteral;
    sidebarToolEnabled: boolean;
    sidebarTabTool: ISidebarTabDataProps<ISidebarTabProps>;
    showBaseTileLayerMap: boolean;
} 

const Template : ComponentStory<typeof CustomToolDemo> = args => <CustomToolDemo {...args} />

export const GeovistoCustomToolStory = Template.bind({});

GeovistoCustomToolStory.storyName = 'Custom Tool';
GeovistoCustomToolStory.args = {
    defaultMapPosition: true,
    toolEnabled: true,
    toolId: 'geovisto-custom-tool-map',
    toolName: 'Custom Tool',
    toolLabel: 'Custom Tool label',
    toolUrl: 'https://i.pinimg.com/originals/26/13/9a/26139ad9e6bea6aa53b3a8ff493082d7.jpg',
    toolBounds: [[13.518693995129324, -67.5347243454669], [41.72278746545008, -18.140193331169666]],
    sidebarToolEnabled: true,
    sidebarTabTool: {
        tool: 'geovisto-custom-tool-map',
        enabled: true,
        name: 'Custom image tool settings',
        icon: '<i class="fa fa-image"></i>',
        checkButton: true
    },
    showBaseTileLayerMap: true
}
