// Storybook
import { ComponentStory, ComponentMeta } from '@storybook/react';

// React
import React from "react";

// Geovisto
import { ISidebarTabProps } from 'geovisto-sidebar';

// Internal imports
import { SidebarTab, SidebarTool, FiltersTool, ChoroplethLayerTool } from '../react/components';
import { ISidebarTabDataProps } from '../react/types';

// Styles
import '../styles/common.scss';

// Stories internal helper components
import { ExportMapWrapper } from '../storiesHelpers/ExportMapWrapper';

// Data
import covidCzechDistricts from '../../static/data/covidCzechDistricts.json';

// Config
import czDefaultMapPosition from '../../static/config/defaultPosition/config-czDefaultPosition.json';

const FiltersToolDemo = (props: IFiltersToolDemoProps) : JSX.Element => {

    const extendedProps = {
        mapId: 'geovisto-map-filters-demo',
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
                 <SidebarTab
                    tool='geovisto-tool-layer-choropleth'
                    enabled={true}
                    name='Choropleth layer settings'
                    icon='<i class="fa fa-th-large"></i>'
                    checkButton={true}
                />
            </SidebarTool>
            <FiltersTool 
                id={props.toolId}
                enabled={props.toolEnabled}
                icon={props.toolIcon}
                label={props.toolLabel}
            />
            <ChoroplethLayerTool 
                id='geovisto-tool-layer-choropleth' 
                enabled={true}
                name='Choropleth layer'
            />
        </ExportMapWrapper>
    );
};

export default {
    component: FiltersToolDemo,
    title: 'Tools/Filters Tool',
    argTypes: {
        sidebarToolEnabled: {
            name: "SidebarTool: Enabled",
            description: "Enabled property of the SidebarTool instance.",
        },
        sidebarTabTool: {
            name: "SidebarTab - FiltersTool",
            description: "Properties of the sidebar tab of the FiltersTool.",
        },
        showBaseTileLayerMap: {
            name: "Base tile layer: Enabled",
            description: "Toggles the base tiles layer.",
        },
        toolId: {
            name: "Id",
            description: "Id property of the FiltersTool instance.",
        },
        toolIcon: {
            name: "Icon",
            description: "Icon property of the SelectionTool instance.",
        },
        toolLabel: {
            name: "Label",
            description: "Label property of the FiltersTool instance.",
        },
        toolEnabled: {
            name: "Enabled",
            description: "Enabled property of the FiltersTool instance.",
        },
        defaultMapPosition: {
            name: "Default map position (CZ):",
            description: "Enables/Disables config with the center of the map set on Czech republic.",
        }
    },
} as ComponentMeta<typeof FiltersToolDemo>;

export type IFiltersToolDemoProps = {
    defaultMapPosition: boolean,
    toolId: string;
    toolEnabled: boolean;
    toolIcon: string;
    toolLabel: string;
    sidebarToolEnabled: boolean;
    sidebarTabTool: ISidebarTabDataProps<ISidebarTabProps>;
    showBaseTileLayerMap: boolean;
} 

const Template : ComponentStory<typeof FiltersToolDemo> = args => <FiltersToolDemo {...args} />

export const GeovistoFiltersToolStory = Template.bind({});

GeovistoFiltersToolStory.storyName = 'Filters Tool';
GeovistoFiltersToolStory.args = {
    defaultMapPosition: true,
    toolEnabled: true,
    toolId: 'geovisto-filters-tool-map',
    toolIcon: '<i class="fa fa-filter"></i>',
    toolLabel: 'Filters Tool label',
    sidebarToolEnabled: true,
    sidebarTabTool: {
        tool: 'geovisto-filters-tool-map',
        enabled: true,
        name: 'Filters settings',
        icon: '<i class="fa fa-filter"></i>',
        checkButton: true
    },
    showBaseTileLayerMap: true
}
