// Storybook
import { ComponentStory, ComponentMeta } from '@storybook/react';

// React
import React from "react";

// Geovisto
import { ISidebarTabProps } from 'geovisto-sidebar';

// Internal imports
import '../react/Constants';
import { SidebarTab, SidebarTool, FiltersTool } from '../react/components';
import { ISidebarTabDataProps } from '../react/types';

// Styles
import '../styles/common.scss';

// Stories internal helper components
import { ExportMapWrapper } from '../storiesHelpers/ExportMapWrapper';

// Data
import demo1 from '../../static/data/demo1.json';

const FiltersToolDemo = (props: IFiltersToolDemoProps) : JSX.Element => {

    const extendedProps = {
        mapId: 'geovisto-map-filters-demo',
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
            <FiltersTool 
                id={props.toolId}
                enabled={props.toolEnabled}
                icon={props.toolIcon}
                label={props.toolLabel}
            />
        </ExportMapWrapper>
    );
};

export default {
    component: FiltersToolDemo,
    title: 'Tools/Filters Tool',
    argTypes: {
        sidebarToolEnabled: {
            name: "SidebarTool: enabled",
            description: "Enabled property of the SidebarTool instance.",
        },
        sidebarTabTool: {
            name: "SidebarTab - FiltersTool",
            description: "Properties of the sidebar tab of the FiltersTool.",
        },
        showBaseTileLayerMap: {
            name: "Base tile layer: enabled",
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
        }
    },
} as ComponentMeta<typeof FiltersToolDemo>;

export type IFiltersToolDemoProps = {
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
    toolEnabled: true,
    toolId: 'geovisto-filters-tool-map',
    toolIcon: '<i class="fa fa-filter"></i>',
    toolLabel: 'Filters Tool label',
    sidebarToolEnabled: true,
    sidebarTabTool: {
        tool: 'geovisto-filters-tool-map',
        enabled: true,
        name: 'Connection layer settings',
        icon: '<i class="fa fa-road"></i>',
        checkButton: true
    },
    showBaseTileLayerMap: true
}
