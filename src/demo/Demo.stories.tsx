// Storybook
import {
    Story,
    Meta
} from '@storybook/react/types-6-0';

// React
import React, { Component } from "react";

// React-Geovisto
import ReactGeovistoMap from "../react/ReactGeovistoMap";

import './Demo.scss';

// Geovisto Tools
import {
    GeovistoSidebarTool,
    GeovistoFiltersTool,
    GeovistoThemesTool,
    GeovistoSelectionTool,
    GeovistoTilesLayerTool,
    GeovistoChoroplethLayerTool,
    GeovistoMarkerLayerTool,
    GeovistoConnectionLayerTool,
    SidebarTab
} from '../tools';
import { Geovisto } from '..';

/* example of screen component with grid layout and card wrapper usage */

const C_ID_select_data = "leaflet-combined-map-select-data";
const C_ID_check_data = "leaflet-combined-map-check-data";
const C_ID_input_data = "leaflet-combined-map-input-data";
const C_ID_check_config = "leaflet-combined-map-check-config";
const C_ID_input_config = "leaflet-combined-map-input-config";
const C_ID_input_import = "leaflet-combined-map-input-import";
const C_ID_input_export = "leaflet-combined-map-input-export";

class Demo extends Component<Record<string, never>, { data: unknown, config: Record<string, unknown> }> {
    
    private polygons: unknown;
    private centroids: unknown;
    private polygons2: unknown;
    private centroids2: unknown;
    private map: React.RefObject<ReactGeovistoMap>;

    public constructor(props: Record<string, never>) {
        super(props);

        // initialize geo objects
        this.polygons = require("/static/geo/country_polygons.json");
        this.centroids = require("/static/geo/country_centroids.json");
        this.polygons2 = require("/static/geo/czech_districts_polygons.json");
        this.centroids2 = require("/static/geo/czech_districts_centroids.json");

        // data and config can be changed
        this.state = {
            // implicit data
            data: require('/static/data/timeData.json'),
            // implicit config
            config: require('/static/config/config.json')
        };

        // reference to the rendered map
        this.map = React.createRef();
    }

    public componentDidMount(): void {

        // ------ enable check boxes ------ //

        const enableInput = function(checked: boolean, id: string) {
            if(checked) {
                document.getElementById(id).removeAttribute("disabled");
            } else {
                document.getElementById(id).setAttribute("disabled", "disabled");
            }
        };

        // enable data check box
        const enableDataInput = function(e: Event) {
            enableInput((e.target as HTMLInputElement).checked, C_ID_input_data);
        };
        document.getElementById(C_ID_input_data).setAttribute("disabled", "disabled");
        document.getElementById(C_ID_check_data).onchange = enableDataInput;

        // enable config check box
        const enableConfigInput = function(e: Event) {
            enableInput((e.target as HTMLInputElement).checked, C_ID_input_config);
        };
        document.getElementById(C_ID_input_config).setAttribute("disabled", "disabled");
        document.getElementById(C_ID_check_config).onchange = enableConfigInput;

        // ------ process files ------ //

        // process path
        const pathSubmitted = function(file: File, result: { json: unknown | undefined }) {
            const reader = new FileReader();
            const onLoadAction = function(e: ProgressEvent<FileReader>) {
                try {
                    console.log(e);
                    //console.log(reader.result);
                    if(typeof reader.result == "string") {
                        result.json = JSON.parse(reader.result);
                    }
                } catch(ex) {
                    console.log("unable to read file");
                    console.log(ex);
                    // TODO: notify user
                }
            };
            reader.onload = onLoadAction;
            reader.readAsText(file);
        };

        // process data path
        const data = {
            json: undefined
        };
        const dataPathSubmitted = function(this: HTMLInputElement) {
            console.log(this.files);
            pathSubmitted(this.files[0], data);
        };
        document.getElementById(C_ID_input_data).addEventListener('change', dataPathSubmitted, false);

        // process config path
        const config = {
            json: undefined
        };
        const configPathSubmitted = function(this: HTMLInputElement) {
            console.log(this.files);
            pathSubmitted(this.files[0], config);
        };
        document.getElementById(C_ID_input_config).addEventListener('change', configPathSubmitted, false);

        // ------ import ------ //

        // import action
        const importAction = (e: MouseEvent) => {

            console.log(e);
            console.log("data: ", data);
            console.log("config: ", config);

            // process data json
            if(!(document.getElementById(C_ID_check_data) as HTMLInputElement).checked || data.json == undefined) {
                const fileName = (document.getElementById(C_ID_select_data) as HTMLInputElement).value;
                console.log(fileName);
                data.json = require('/static/data/' + fileName);
            }

            // process config json
            if(!(document.getElementById(C_ID_check_config) as HTMLInputElement).checked || config.json == undefined) {
                config.json = require('/static/config/config.json');
            }

            // update state
            this.setState({
                data: data.json,
                config: config.json
            });
        };
        document.getElementById(C_ID_input_import).addEventListener('click', importAction);

        // ------ export ------ //

        // export action
        const exportAction = (e: MouseEvent) => {
            console.log(e);

            // expert map configuration
            const config = JSON.stringify(this.map.current.getMap().export(), null, 2);

            // download file
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(config));
            element.setAttribute('download', "config.json");
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);

            console.log("rendered map:", );
        };
        document.getElementById(C_ID_input_export).addEventListener('click', exportAction);
    }

    readonly sidebarTabTiles = new SidebarTab({
        enabled: true,
        name: "[CUSTOM] Map layer settings",
        icon: "<i class=\"fa fa-eur\"></i>",
        checkButton: false
    });

    readonly sidebarTabChoropleth = new SidebarTab({
        enabled: true,
        name: "[CUSTOM] Choropleth layer settings",
        icon: "<i class=\"fa fa-usd\"></i>",
        checkButton: true
    });

    public render(): JSX.Element {
        console.log("rendering...");
        return (
            <div className="demo-container">
                <div className="demo-toolbar">
                    <span>Data file: </span>
                    <select id={C_ID_select_data}>
                        <option value="timeData.json">timeData.json</option>
                        <option value="demo1.json">demo1.json</option>
                        <option value="demo2.json">demo2.json</option>
                        <option value="covidCzechDistricts.json">covid czech districts</option>
                        <option value="covidCzechDistrictsCumulative.json">covid czech districts (cumulative)</option>
                        <option value="ovidCzechDistrictsCategoric.json">covid czech districts (categoric)</option>
                        <option disabled></option>
                    </select>

                    <span> or <input id={C_ID_check_data} type="checkbox"/> custom file: </span>
                    <input id={C_ID_input_data} type="file" accept=".json" size={3}/>

                    <input id={C_ID_check_config} type="checkbox"/>
                    <span> Configuration file: </span>
                    <input id={C_ID_input_config} type="file" accept=".json" size={3}/>

                    <input id={C_ID_input_import} type="submit" value="import"/>
                    <input id={C_ID_input_export} type="submit" value="export"/>
                </div>
                <div className="demo-map">
                    <ReactGeovistoMap
                        ref={this.map}
                        id="my-geovisto-map"
                        data={Geovisto.getMapDataManagerFactory().json(this.state.data)}
                        geoData={Geovisto.getGeoDataManager([
                            Geovisto.getGeoDataFactory().geojson("world polygons", this.polygons),
                            Geovisto.getGeoDataFactory().geojson("world centroids", this.centroids),
                            Geovisto.getGeoDataFactory().geojson("czech polygons", this.polygons2),
                            Geovisto.getGeoDataFactory().geojson("czech centroids", this.centroids2)
                        ])}
                        // config={Geovisto.getMapConfigManagerFactory().default(this.state.config)}
                        globals={undefined}
                        templates={undefined}
                        tools={Geovisto.createMapToolsManager([
                            GeovistoSidebarTool.createTool({
                                id: "geovisto-tool-sidebar",
                                tabs: [
                                    ["geovisto-tool-layer-map", this.sidebarTabTiles],
                                    ["geovisto-tool-layer-choropleth", this.sidebarTabChoropleth]
                                ]
                            }),
                            GeovistoFiltersTool.createTool({
                                id: "geovisto-tool-filters",
                                manager: GeovistoFiltersTool.createFiltersManager([
                                    // filter operations
                                    GeovistoFiltersTool.createFilterOperationEq(),
                                    GeovistoFiltersTool.createFilterOperationNeq(),
                                    GeovistoFiltersTool.createFilterOperationReg()
                                ])
                            }),
                            GeovistoThemesTool.createTool({
                                id: "geovisto-tool-themes",
                                manager: GeovistoThemesTool.createThemesManager([
                                    // style themes
                                    GeovistoThemesTool.createThemeLight1(),
                                    GeovistoThemesTool.createThemeLight2(),
                                    GeovistoThemesTool.createThemeLight3(),
                                    GeovistoThemesTool.createThemeDark1(),
                                    GeovistoThemesTool.createThemeDark2(),
                                    GeovistoThemesTool.createThemeDark3(),
                                    GeovistoThemesTool.createThemeBasic()
                                ])
                            }),
                            GeovistoSelectionTool.createTool({
                                id: "geovisto-tool-selection",
                            }),
                            GeovistoTilesLayerTool.createTool({
                                id: "geovisto-tool-layer-map",
                                enabled: true,
                                name: "Map layer"
                            }),
                            GeovistoChoroplethLayerTool.createTool({
                                id: "geovisto-tool-layer-choropleth"
                            }),
                            GeovistoMarkerLayerTool.createTool({
                                id: "geovisto-tool-layer-marker"
                            }),
                            GeovistoConnectionLayerTool.createTool({
                                id: "geovisto-tool-layer-connection"
                            }),
                        ])}
                    />
                </div>
            </div>
        );
    }
}

export default {
    title: 'Maps',
    component: Demo,
} as Meta;

export const GeovistoMap: Story = () => <Demo />;