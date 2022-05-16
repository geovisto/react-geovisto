// Storybook
import { ComponentStory, ComponentMeta } from '@storybook/react';

// React
import React, { useMemo } from "react";

// Geovisto
import { ISidebarFragment, ISidebarTabProps, SidebarFragment } from 'geovisto-sidebar';
import { GeovistoThemesTool, IMapTheme, IMapThemesManager } from 'geovisto-themes';

// Internal imports
import '../react/Constants';
import { SidebarTab, SidebarTool, ThemesTool } from '../react/components';
import { ISidebarTabDataProps } from '../react/types';

// Styles
import '../styles/common.scss';

// Stories internal helper components
import { ExportMapWrapper } from '../storiesHelpers/ExportMapWrapper';

// Data
import demo1 from '../../static/data/demo1.json';

const themesDict : Record<string, IMapTheme> = {
    'light1': GeovistoThemesTool.createThemeLight1(),
    'light2': GeovistoThemesTool.createThemeLight2(),
    'light3': GeovistoThemesTool.createThemeLight3(),
    'dark1': GeovistoThemesTool.createThemeDark1(),
    'dark2': GeovistoThemesTool.createThemeDark2(),
    'dark3': GeovistoThemesTool.createThemeDark3(),
    'basic': GeovistoThemesTool.createThemeBasic()
};

const themeLabels : string[] = Object.entries(themesDict).map(theme => theme[0]);
const themes : IMapTheme[] = Object.entries(themesDict).map(theme => theme[1]); 

const ThemesToolDemo = (props: IThemesToolDemoProps) : JSX.Element => {

    const extendedProps = {
        mapId: 'geovisto-map-themes-demo',
        showBaseTileLayerMap: true,
        data: demo1,
        ...props
    };
    
    const themesManager = useMemo((): IMapThemesManager => {
        return GeovistoThemesTool.createThemesManager(themes);
    }, []); 

    const themesFragment = useMemo((): [string, ISidebarFragment][] => 
        [['geovisto-tool-themes', new SidebarFragment({ enabled:true })]]
    , []);

    return (
        <ExportMapWrapper {...extendedProps}>
            <SidebarTool 
                id='geovisto-tool-sidebar'
                enabled={props.sidebarToolEnabled}
            >
                <SidebarTab
                    fragments={themesFragment}
                    {...props.sidebarTabTool}
                />
            </SidebarTool>
            <ThemesTool 
                id={props.toolId}
                enabled={props.toolEnabled}
                label={props.toolLabel}
                manager={themesManager}
                theme={props.toolTheme}
            />
        </ExportMapWrapper>
    );
};

export default {
    component: ThemesToolDemo,
    title: 'Tools/Themes Tool',
    argTypes: {
        sidebarToolEnabled: {
            name: "SidebarTool: Enabled",
            description: "Enabled property of the SidebarTool instance.",
        },
        sidebarTabTool: {
            name: "SidebarTab - ThemesTool",
            description: "Properties of the sidebar tab of the ThemesTool.",
        },
        toolId: {
            name: "Id",
            description: "Id property of the ThemesTool instance.",
        },
        toolTheme: {
            name: "Theme",
            description: "Theme property of the ThemesTool instance.",
            options: themeLabels,
            mapping: {
                light1: themesDict['light1'],
                light2: themesDict['light2'],
                light3: themesDict['light3'],
                dark1: themesDict['dark1'],
                dark2: themesDict['dark2'],
                dark3: themesDict['dark3'],
                basic: themesDict['basic']
            },
            sort: 'requiredFirst',
            control: {
              type: "select",
              labels: {
                light1: "Light theme 1",
                light2: "Light theme 2",
                light3: "Light theme 3",
                dark1: "Dark theme 1",
                dark2: "Dark theme 2",
                dark3: "Dark theme 3",
                basic: "Basic theme"
              },
            },
        },
        toolLabel: {
            name: "Label",
            description: "Label property of the ThemesTool instance.",
        },
        toolEnabled: {
            name: "Enabled",
            description: "Enabled property of the ThemesTool instance.",
        }
    },
} as ComponentMeta<typeof ThemesToolDemo>;

export type IThemesToolDemoProps = {
    toolId: string;
    toolEnabled: boolean;
    toolTheme: IMapTheme;
    toolLabel: string;
    sidebarToolEnabled: boolean;
    sidebarTabTool: ISidebarTabDataProps<ISidebarTabProps>;
} 

const Template : ComponentStory<typeof ThemesToolDemo> = args => <ThemesToolDemo {...args} />

export const GeovistoThemesToolStory = Template.bind({});

GeovistoThemesToolStory.storyName = 'Themes Tool';
GeovistoThemesToolStory.args = {
    toolEnabled: true,
    toolId: 'geovisto-themes-tool-map',
    toolTheme: themesDict['dark1'],
    toolLabel: 'Themes Tool label',
    sidebarToolEnabled: true,
    sidebarTabTool: {
        enabled: true,
        name: 'Themes settings',
        icon: '<i class="fa fa-gear"></i>',
        checkButton: true,
    },
}
