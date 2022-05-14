// Storybook
import { ComponentStory, ComponentMeta } from '@storybook/react';

// React
import React, { useMemo } from "react";

// Geovisto
import { ISidebarFragment, ISidebarTabProps, SidebarFragment } from 'geovisto-sidebar';
import { GeovistoSelectionTool, IMapSelection } from 'geovisto-selection';

// Internal imports
import '../react/Constants';
import { SidebarTab, SidebarTool, SelectionTool } from '../react/components';
import { ISidebarTabDataProps } from '../react/types';

// Styles
import '../styles/common.scss';

// Stories internal helper components
import { ExportMapWrapper } from '../storiesHelpers/ExportMapWrapper';

// Data
import demo1 from '../../static/data/demo1.json';

const SelectionToolDemo = (props: ISelectionToolDemoProps) : JSX.Element => {

    const extendedProps = {
        mapId: 'geovisto-map-selection-demo',
        showBaseTileLayerMap: true,
        data: demo1,
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
            </SidebarTool>
            <SelectionTool 
                id={props.toolId}
                enabled={props.toolEnabled}
                label={props.toolLabel}
                icon={props.toolIcon}
                // selection={selectionManager}
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
        }
    },
} as ComponentMeta<typeof SelectionToolDemo>;

export type ISelectionToolDemoProps = {
    toolId: string;
    toolEnabled: boolean;
    toolIcon: string;
    toolLabel: string;
    toolSelection: IMapSelection;
    sidebarToolEnabled: boolean;
    sidebarTabTool: ISidebarTabDataProps<ISidebarTabProps>;
} 

const Template : ComponentStory<typeof SelectionToolDemo> = args => <SelectionToolDemo {...args} />

export const GeovistoSelectionToolStory = Template.bind({});

GeovistoSelectionToolStory.storyName = 'Selection Tool';
GeovistoSelectionToolStory.args = {
    toolEnabled: true,
    toolId: 'geovisto-selection-tool-map',
    toolIcon: '<i class="fa fa-pen"></i>',
    toolLabel: 'Selection Tool label',
    // toolSelection: GeovistoSelectionTool.createSelection(
    // ["CZE"]),
    sidebarToolEnabled: true,
    sidebarTabTool: {
        enabled: true,
        name: 'Selection settings',
        icon: '<i class="fa fa-gear"></i>',
        checkButton: true,
    },
}
