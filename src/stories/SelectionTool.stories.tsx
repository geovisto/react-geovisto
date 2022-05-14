// Storybook
import { ComponentStory, ComponentMeta } from '@storybook/react';

// React
import React, { useMemo } from "react";

// Geovisto
import { ISidebarFragment, ISidebarTabProps, SidebarFragment } from 'geovisto-sidebar';

// Internal imports
import '../react/Constants';
import { SidebarTab, SidebarTool, SelectionTool, ChoroplethLayerTool, MarkerLayerTool, ConnectionLayerTool } from '../react/components';
import { ISidebarTabDataProps } from '../react/types';

// Styles
import '../styles/common.scss';

// Stories internal helper components
import { ExportMapWrapper } from '../storiesHelpers/ExportMapWrapper';

// Data
import covidCzechDistricts from '../../static/data/covidCzechDistricts.json';

// Config
import czDefaultMapPosition from '../../static/config/defaultPosition/config-czDefaultPosition.json';

const SelectionToolDemo = (props: ISelectionToolDemoProps) : JSX.Element => {

    const extendedProps = {
        mapId: 'geovisto-map-selection-demo',
        showBaseTileLayerMap: true,
        data: covidCzechDistricts,
        config: props.defaultMapPosition ? czDefaultMapPosition : undefined,
        ...props
    };
    
    // const tool = map.current!.getMap()!.getState().getTools().getById('tool-id');
    // GeovistoSelectionTool.createSelection(tool!, ["CZE", "BEL"]);

    // const selection = useMemo((): IMapSelectionManager => {
    //     return GeovistoSelectionTool.createSelection();
    // }, []); 

    const selectionFragment = useMemo((): [string, ISidebarFragment][] => 
        [['geovisto-tool-selection', new SidebarFragment({ enabled:true })]]
    , []);

    return (
        <ExportMapWrapper {...extendedProps}>
            <SidebarTool 
                id='geovisto-tool-sidebar'
                enabled={props.sidebarToolEnabled}
            >
                <SidebarTab
                    fragments={selectionFragment}
                    {...props.sidebarTabTool}
                />
                <SidebarTab
                    tool='geovisto-tool-layer-choropleth'
                    enabled={true}
                    name='Choropleth layer settings'
                    icon='<i class="fa fa-th-large"></i>'
                    checkButton={true}
                />
                <SidebarTab
                    tool='geovisto-tool-layer-marker'
                    enabled={true}
                    name='Marker layer settings'
                    icon='<i class="fa fa-map-marker"></i>'
                    checkButton={true}
                />
                <SidebarTab
                    tool='geovisto-tool-layer-connection'
                    enabled={true}
                    name='Connection layer settings'
                    icon='<i class="fa fa-road"></i>'
                    checkButton={true}
                />
            </SidebarTool>
            <SelectionTool 
                id={props.toolId}
                enabled={props.toolEnabled}
                label={props.toolLabel}
                icon={props.toolIcon}
            />
            <ChoroplethLayerTool 
                id='geovisto-tool-layer-choropleth' 
                enabled={true}
                name='Choropleth layer'
            />
            <MarkerLayerTool 
                id='geovisto-tool-layer-marker'
                enabled={true}
            />
            <ConnectionLayerTool
                id='geovisto-tool-layer-connection'
                enabled={true}
            />
        </ExportMapWrapper>
    );
};

export default {
    component: SelectionToolDemo,
    title: 'Tools/Selection Tool',
    argTypes: {
        sidebarToolEnabled: {
            name: "SidebarTool: enabled",
            description: "Enabled property of the SidebarTool instance.",
        },
        sidebarTabTool: {
            name: "SidebarTab - SelectionTool",
            description: "Properties of the sidebar tab of the SelectionTool.",
        },
        toolId: {
            name: "Id",
            description: "Id property of the SelectionTool instance.",
        },
        toolIcon: {
            name: "Icon",
            description: "Icon property of the SelectionTool instance.",
        },
        toolLabel: {
            name: "Label",
            description: "Label property of the SelectionTool instance.",
        },
        toolEnabled: {
            name: "Enabled",
            description: "Enabled property of the SelectionTool instance.",
        },
        toolSelection: {
            name: "Selection",
            description: "Selection property of the SelectionTool instance.",
        },
        defaultMapPosition: {
            name: "Default map position (CZ):",
            description: "Enables/Disables config with the center of the map set on Czech republic.",
        }
    },
} as ComponentMeta<typeof SelectionToolDemo>;

export type ISelectionToolDemoProps = {
    defaultMapPosition: boolean,
    toolId: string;
    toolEnabled: boolean;
    toolIcon: string;
    toolLabel: string;
    sidebarToolEnabled: boolean;
    sidebarTabTool: ISidebarTabDataProps<ISidebarTabProps>;
} 

const Template : ComponentStory<typeof SelectionToolDemo> = args => <SelectionToolDemo {...args} />

export const GeovistoSelectionToolStory = Template.bind({});

GeovistoSelectionToolStory.storyName = 'Selection Tool';
GeovistoSelectionToolStory.args = {
    defaultMapPosition: true,
    toolEnabled: true,
    toolId: 'geovisto-selection-tool-map',
    toolIcon: '<i class="fa fa-pen"></i>',
    toolLabel: 'Selection Tool label',
    sidebarToolEnabled: true,
    sidebarTabTool: {
        enabled: true,
        name: 'Selection settings',
        icon: '<i class="fa fa-gear"></i>',
        checkButton: true,
    },
}
