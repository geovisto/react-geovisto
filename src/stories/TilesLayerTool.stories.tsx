// Storybook
import { ComponentStory, ComponentMeta } from '@storybook/react';

// React
import React, { useMemo } from "react";

// Geovisto
import { IMapTilesModel } from 'geovisto';
import { ISidebarTabProps } from 'geovisto-sidebar';

// Internal imports
import '../react/Constants';
import { SidebarTab, SidebarTool, TilesLayerTool } from '../react/components/';
import { ISidebarTabDataProps } from '../react/types';

// Styles
import '../styles/common.scss';

// Stories internal helper components
import { ExportMapWrapper } from '../storiesHelpers/ExportMapWrapper';


const TilesLayerToolDemo = (props: ITilesLayerToolDemoProps) : JSX.Element => {
    
    const extendedProps = {
        mapId: 'geovisto-map-tiles-demo',
        showBaseTileLayerMap: false,
        ...props
    };

    const baseMap = useMemo((): IMapTilesModel => {
        return {
            url: props.toolBaseMap,
            maxZoom: 20,
            maxNativeZoom: 19
        };
    }, [props.toolBaseMap]);

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
            <TilesLayerTool 
                id={props.toolId}
                enabled={props.toolEnabled}
                name={props.toolName}
                label="Awesome tiles layer label"
                baseMap={baseMap}
            />
        </ExportMapWrapper>
    );
};

export default {
    component: TilesLayerToolDemo,
    title: 'Tools/Tiles Layer Tool',
    argTypes: {
        sidebarToolEnabled: {
            name: "SidebarTool: Enabled",
            description: "Enabled property of the SidebarTool instance.",
            defaultValue: false
        },
        sidebarTabTool: {
            name: "SidebarTab - TilesLayerTool",
            description: "Properties of the sidebar tab of the TilesLayerTool",
            defaultValue: false
        },
        toolId: {
            name: "TilesLayerTool: id",
            description: "Id property of the TilesLayerTool instance.",
        },
        toolName: {
            name: "TilesLayerTool: name",
            description: "Name property of the TilesLayerTool instance.",
        },
        toolLabel: {
            name: "TilesLayerTool: label",
            description: "Label property of the TilesLayerTool instance.",
        },
        toolEnabled: {
            name: "TilesLayerTool: enabled",
            description: "Enabled property of the TilesLayerTool instance.",
            defaultValue: false
        },
        toolBaseMap: {
            name: "TilesLayerTool: BaseMap Url",
            description: "Url source for the base map tiles.",
            options: ["mapycz", "openstreetmap"],
            mapping: {
                mapycz: 'https://mapserver.mapy.cz/turist-m/{z}-{x}-{y}',
                openstreetmap: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            },
            control: {
              type: "select",
              defaultValue: 'mapycz',
              labels: {
                mapycz: "Mapy.cz",
                openstreetmap: "Openstreetmap",
              },
            },
        },
      },
} as ComponentMeta<typeof TilesLayerToolDemo>;

export type ITilesLayerToolDemoProps = {
    toolId: string;
    toolEnabled: boolean;
    toolName: string;
    toolLabel: string;
    toolBaseMap: string;
    sidebarToolEnabled: boolean;
    sidebarTabTool: ISidebarTabDataProps<ISidebarTabProps>;
} 

const Template : ComponentStory<typeof TilesLayerToolDemo> = args => <TilesLayerToolDemo {...args} />

export const GeovistoTilesLayerToolStory = Template.bind({});

GeovistoTilesLayerToolStory.storyName = 'Tiles Layer Tool';
GeovistoTilesLayerToolStory.args = {
    toolEnabled: true,
    toolBaseMap: 'mapycz',
    toolId: 'geovisto-tool-layer-map',
    toolName: 'Tiles Layer Tool',
    toolLabel: 'Label of the TilesLayerTool.',
    sidebarToolEnabled: true,
    sidebarTabTool: {
        tool: 'geovisto-tool-layer-map',
        enabled: true,
        name: 'Map layer settings',
        icon: '<i class="fa fa-globe"></i>',
        checkButton: true
    }
}
