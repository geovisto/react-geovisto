// Storybook
import { Story, Meta } from '@storybook/react/types-6-0';

// React
import React, { useMemo, useRef } from "react";

// Geovisto
import { GeovistoThemesTool, IMapTheme, IMapThemesManager } from 'geovisto-themes';
import { Geovisto, IGeoDataManager, IMapConfigManager, IMapDataManager, IMapTilesModel } from 'geovisto';
import { ISidebarFragment, ISidebarTabProps, SidebarFragment } from 'geovisto-sidebar';

// Internal imports
import { ConnectionLayerTool, ChoroplethLayerTool, MarkerLayerTool, SidebarTab, GeovistoMap,
        SidebarTool, ThemesTool, TilesLayerTool, ToolGroup, SelectionTool, FiltersTool, CustomTool } from '../react/components/';
import { IGeovistoMapHandle, ISidebarTabDataProps } from '../react/types';
    
// Styles
import '../styles/common.scss';

import 'font-awesome/css/font-awesome.min.css';

import "geovisto/dist/index.css";
import "geovisto-sidebar/dist/index.css";
import "geovisto-filters/dist/index.css";
import 'geovisto-layer-choropleth/dist/index.css';
import 'geovisto-layer-marker/dist/index.css';
import 'geovisto-layer-connection/dist/index.css';

import 'leaflet';
import 'leaflet-sidebar-v2';
import "leaflet/dist/leaflet.css";
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

// Data
import covidCzechDistricts from '../../static/data/covidCzechDistricts.json';
import covidCzechDistrictsCategoric from '../../static/data/covidCzechDistrictsCategoric.json';
import covidCzechDistrictsCumulative from '../../static/data/covidCzechDistrictsCumulative.json';
import demo1 from '../../static/data/demo1.json';
import demo2 from '../../static/data/demo2.json';
import timeData from '../../static/data/timeData.json';

// Config
import config from '../../static/config/config.json';
import configDemo1 from '../../static/config/config-demo1.json';
import configDemo2 from '../../static/config/config-demo2.json';
import configFeature from '../../static/config/config-feature18.json';
import configTimeline from '../../static/config/config-timeline.json';

// Polygons & Centroids
import polygons from '../../static/geo/country_polygons.json';
import polygons2 from '../../static/geo/czech_districts_polygons.json';
import centroids from '../../static/geo/country_centroids.json';
import centroids2 from '../../static/geo/czech_districts_centroids.json';


const ReactGeovistoFinal = (props: IDemoProps) : JSX.Element => {

    const map = useRef<IGeovistoMapHandle>(null);

    /* 
     * Exporting current map configuration to JSON file
     */
    const exportAction = () => {
        
        const mapObj = map.current?.getMap(); 

        if(mapObj === undefined) {
            console.error("Map is not initialized, cannot export.");
            return;
        }

        // Export map configuration
        const config = JSON.stringify(mapObj.export(), null, 2);
        
        // Download file
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(config));
        element.setAttribute('download', "config.json");
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const dataManager = useMemo((): IMapDataManager => {
        return Geovisto.getMapDataManagerFactory().json(props.data);
     }, [props.data]); 

     const configManager = useMemo((): IMapConfigManager | undefined => {
        return props.config ? Geovisto.getMapConfigManagerFactory().default(props.config) : undefined;
     }, [props.config]); 

     const geoDataManager = useMemo((): IGeoDataManager => {
        return Geovisto.getGeoDataManager([
            Geovisto.getGeoDataFactory().geojson("world polygons", polygons),
            Geovisto.getGeoDataFactory().geojson("world centroids", centroids),
            Geovisto.getGeoDataFactory().geojson("czech polygons", polygons2),
            Geovisto.getGeoDataFactory().geojson("czech centroids", centroids2)
        ]);
     }, []); 

    const themesManager = useMemo((): IMapThemesManager => {
       return GeovistoThemesTool.createThemesManager([
            GeovistoThemesTool.createThemeLight1(),
            GeovistoThemesTool.createThemeLight2(),
            GeovistoThemesTool.createThemeLight3(),
            GeovistoThemesTool.createThemeDark1(),
            GeovistoThemesTool.createThemeDark2(),
            GeovistoThemesTool.createThemeDark3(),
            GeovistoThemesTool.createThemeBasic()
        ]);
    }, []); 
    
    const baseMap = useMemo((): IMapTilesModel => {
        return {
            url: props.tilesLayerToolBaseMapUrl,
            maxZoom: 20,
            maxNativeZoom: 19
        };
    }, [props.tilesLayerToolBaseMapUrl]);

    const fragments = useMemo((): [string, ISidebarFragment][] => {
        return [
            ['geovisto-tool-themes', new SidebarFragment({ enabled:true })],
            ['geovisto-tool-selection', new SidebarFragment({ enabled:true })]
        ];
    }, []);

    const theme = useMemo(() : IMapTheme => {
        return GeovistoThemesTool.createThemeDark3();
     }, []);  

     return (
        <>
            <GeovistoMap
                ref={map}
                id='geovisto-map'
                className={props.className}
                data={dataManager}
                geoData={geoDataManager}
                config={configManager}
                globals={undefined}
                templates={undefined}
                >
                <ToolGroup>
                    <SidebarTool 
                        id='geovisto-tool-sidebar'
                        enabled={props.sidebarToolEnable}
                    >
                        <SidebarTab
                            enabled={true}
                            name="General settings"
                            icon='<i class="fa fa-gear"></i>'
                            checkButton={false}
                            fragments={fragments}
                        />
                        <SidebarTab
                            {...props.sidebarTabTilesLayerTool}
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
                        <SidebarTab
                            tool='geovisto-tool-filters'
                            enabled={true}
                            name='Filters'
                            icon='<i class="fa fa-filter"></i>'
                            checkButton={true}
                        />
                    </SidebarTool>

                    <TilesLayerTool 
                        id={props.tilesLayerToolId}
                        enabled={props.tilesLayerToolEnable}
                        label="Awesome tiles layer label"
                        baseMap={baseMap}
                    />
                    <ThemesTool
                        id='geovisto-tool-themes'
                        manager={themesManager}
                        enabled={props.themesToolEnable}
                        theme={theme}
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
                    <SelectionTool
                        id='geovisto-tool-selection'
                        enabled={true}
                    />
                    <FiltersTool
                        id='geovisto-tool-filters'
                        enabled={true}
                    />
                </ToolGroup>
            </GeovistoMap>

            <div className='demo-footer'>
                <div>
                    <button className='export-btn' onClick={exportAction}>Export</button>
                </div>
            </div>
        </>
    );
};

export default {
    title: 'Maps',
    component: ReactGeovistoFinal,
    argTypes: {
        data: {
            name: "Data",
            description:
              "Select data for the map content.",
            options: ["covidCzechDistricts", "covidCzechDistrictsCategoric", "covidCzechDistrictsCumulative", "demo1", "demo2", "timeData"],
            mapping: {
                covidCzechDistricts: covidCzechDistricts,
                covidCzechDistrictsCategoric: covidCzechDistrictsCategoric,
                covidCzechDistrictsCumulative: covidCzechDistrictsCumulative,
                demo1: demo1,
                demo2: demo2,
                timeData: timeData
            },
            sort: 'requiredFirst',
            control: {
              type: "select",
              labels: {
                covidCzechDistricts: "Covid Czech Districts",
                covidCzechDistrictsCategoric: "Covid Czech Districts Categoric",
                covidCzechDistrictsCumulative: "Covid Czech Districts Cumulative",
                demo1: "Demo 1",
                demo2: "Demo 2",
                timeData: "Time Data"
              },
            },
        },
        config: {
            name: "Config",
            description:
              "Select map configuration file.",
            options: ["none", "config", "configDemo1", "configDemo2", "configFeature", "configTimeline"],
            mapping: {
                none: undefined,
                config: config,
                configDemo1: configDemo1,
                configDemo2: configDemo2,
                configFeature: configFeature,
                configTimeline: configTimeline
            },
            sort: 'requiredFirst',
            control: {
              type: "select",
              labels: {
                none: "No configuration file",
                config: "Base config",
                configDemo1: "Demo 1 config",
                configDemo2: "Demo 2 config",
                configFeature: "Feature config",
                configTimeline: "Timeline config"
              },
            },
        },
        className: {
            name: "Class name",
            description: "Class name to style the map container element.",
        },
        sidebarToolEnable: {
            name: "SidebarTool: enabled",
            description: "Enabled property of the SidebarTool instance.",
        },
        themesToolEnable: {
            name: "ThemesTool: enabled",
            description: "Enabled property of the ThemesTool instance.",
        },
        tilesLayerToolEnable: {
            name: "TilesLayerTool: enabled",
            description: "Enabled property of the TilesLayerTool instance.",
        },
        sidebarTabTilesLayerTool: {
            name: "SidebarTab - TilesLayerTool",
            description: "Properties of the sidebar tab of the TilesLayerTool",
        },
        tilesLayerToolBaseMapUrl: {
            name: "TilesLayerTool: BaseMap Url",
            description: "Url source for the base map tiles.",
            options: ["mapycz", "openstreetmap"],
            mapping: {
                mapycz: 'https://mapserver.mapy.cz/turist-m/{z}-{x}-{y}',
                openstreetmap: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            },
            control: {
              type: "select",
              labels: {
                mapycz: "Mapy.cz",
                openstreetmap: "Openstreetmap",
              },
            },
        },
        tilesLayerToolId: {
            name: "TilesLayerTool: id",
            description: "Id property of the TilesLayerTool instance.",
        },
      },
} as Meta;

type IDemoProps = {
    data: unknown;
    config: Record<string, unknown>;
    className: string;
    sidebarToolEnable: boolean;
    themesToolEnable: boolean;
    tilesLayerToolEnable: boolean;
    tilesLayerToolBaseMapUrl: string;
    tilesLayerToolId: string;
    sidebarTabTilesLayerTool: ISidebarTabDataProps<ISidebarTabProps>;
} 

const Template : Story<IDemoProps> = args => <ReactGeovistoFinal {...args} />

// export const ReactGeovistoMapFinal: Story = () => <ReactGeovistoFinal {...args}/>;

export const ReactGeovistoDemo = Template.bind({});

ReactGeovistoDemo.args = {
    className: 'geovisto-map-styles',
    data: demo1,
    sidebarToolEnable: true,
    themesToolEnable: false,
    tilesLayerToolEnable: true,
    tilesLayerToolBaseMapUrl: 'mapycz',
    tilesLayerToolId: 'geovisto-tool-layer-map',
    sidebarTabTilesLayerTool: {
        tool: 'geovisto-tool-layer-map',
        enabled: true,
        name: 'Map layer settings',
        icon: '<i class="fa fa-globe"></i>',
        checkButton: true
    }
}