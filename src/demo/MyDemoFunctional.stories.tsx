// Storybook
import {
    Story,
    Meta
} from '@storybook/react/types-6-0';

// React
import React, { Component, useEffect, useState } from "react";

// import Tool from "../react/Tool";
import { MyGeovistoMap } from "../react/MyGeovistoMap";
import { Theme } from "../react/Theme";
import { Data } from "../react/Data";

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
} from '../tools';
import { Geovisto } from '..';

import { CHOROPLETH_ID, MARKER_ID, SIDEBAR_ID, TILES_ID } from '../react/Constants'

import { ChoroplethLayerTool, MarkerLayerTool, SidebarTab, SidebarTool, TilesLayerTool, ToolGroup } from '../react/components/index';


/* example of screen component with grid layout and card wrapper usage */

const C_ID_select_data = "leaflet-combined-map-select-data";
const C_ID_check_data = "leaflet-combined-map-check-data";
const C_ID_input_data = "leaflet-combined-map-input-data";
const C_ID_check_config = "leaflet-combined-map-check-config";
const C_ID_input_config = "leaflet-combined-map-input-config";
const C_ID_input_import = "leaflet-combined-map-input-import";
const C_ID_input_export = "leaflet-combined-map-input-export";

const MyDemoFunctional : React.FC<Record<string, never>> = () => {

    let polygons = require("/static/geo/country_polygons.json");
    let centroids = require("/static/geo/country_centroids.json");
    let polygons2 = require("/static/geo/czech_districts_polygons.json");
    let centroids2 = require("/static/geo/czech_districts_centroids.json");
    let map: React.RefObject<typeof MyGeovistoMap>;

    // implicit data
    // const [data, setData] = useState<unknown>(require('/static/data/covidCzechDistricts.json'));
    const [data] = useState<unknown>(require('/static/data/demo1.json'));

    // imlipcit config
    const [config] = useState<Record<string, unknown>>(require('/static/config/config.json'));

    

    useEffect(() => {

        map = React.createRef();

        
    }, []);

    // // ------ enable check boxes ------ //

    // const enableInput = function(checked: boolean, id: string) {
    //     if(checked) {
    //         document.getElementById(id).removeAttribute("disabled");
    //     } else {
    //         document.getElementById(id).setAttribute("disabled", "disabled");
    //     }
    // };

    // // enable data check box
    // const enableDataInput = function(e: Event) {
    //     enableInput((e.target as HTMLInputElement).checked, C_ID_input_data);
    // };
    // document.getElementById(C_ID_input_data).setAttribute("disabled", "disabled");
    // document.getElementById(C_ID_check_data).onchange = enableDataInput;

    // // enable config check box
    // const enableConfigInput = function(e: Event) {
    //     enableInput((e.target as HTMLInputElement).checked, C_ID_input_config);
    // };
    // document.getElementById(C_ID_input_config).setAttribute("disabled", "disabled");
    // document.getElementById(C_ID_check_config).onchange = enableConfigInput;

    // // ------ process files ------ //

    // // process path
    // const pathSubmitted = function(file: File, result: { json: unknown | undefined }) {
    //     const reader = new FileReader();
    //     const onLoadAction = function(e: ProgressEvent<FileReader>) {
    //         try {
    //             console.log(e);
    //             //console.log(reader.result);
    //             if(typeof reader.result == "string") {
    //                 result.json = JSON.parse(reader.result);
    //             }
    //         } catch(ex) {
    //             console.log("unable to read file");
    //             console.log(ex);
    //             // TODO: notify user
    //         }
    //     };
    //     reader.onload = onLoadAction;
    //     reader.readAsText(file);
    // };

    // // process data path
    // const data = {
    //     json: undefined
    // };
    // const dataPathSubmitted = function(this: HTMLInputElement) {
    //     console.log(this.files);
    //     pathSubmitted(this.files[0], data);
    // };
    // document.getElementById(C_ID_input_data).addEventListener('change', dataPathSubmitted, false);

    // // process config path
    // const config = {
    //     json: undefined
    // };
    // const configPathSubmitted = function(this: HTMLInputElement) {
    //     console.log(this.files);
    //     pathSubmitted(this.files[0], config);
    // };
    // document.getElementById(C_ID_input_config).addEventListener('change', configPathSubmitted, false);

    // // ------ import ------ //

    // // import action
    // const importAction = (e: MouseEvent) => {

    //     console.log(e);
    //     console.log("data: ", data);
    //     console.log("config: ", config);

    //     // process data json
    //     if(!(document.getElementById(C_ID_check_data) as HTMLInputElement).checked || data.json == undefined) {
    //         const fileName = (document.getElementById(C_ID_select_data) as HTMLInputElement).value;
    //         console.log(fileName);
    //         data.json = require('/static/data/' + fileName);
    //     }

    //     // process config json
    //     if(!(document.getElementById(C_ID_check_config) as HTMLInputElement).checked || config.json == undefined) {
    //         config.json = require('/static/config/config.json');
    //     }

    //     // update state
    //     setData(data.json);
    //     setConfig(config.json);
    // };
    // document.getElementById(C_ID_input_import).addEventListener('click', importAction);

    // ------ export ------ //

    // export action
    // const exportAction = (e: MouseEvent) => {
    //     console.log(e);

    //     // expert map configuration
    //     const config = JSON.stringify(this.map.current.getMap().export(), null, 2);

    //     // download file
    //     const element = document.createElement('a');
    //     element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(config));
    //     element.setAttribute('download', "config.json");
    //     element.style.display = 'none';
    //     document.body.appendChild(element);
    //     element.click();
    //     document.body.removeChild(element);

    //     console.log("rendered map:", );
    // };
    // document.getElementById(C_ID_input_export).addEventListener('click', exportAction);


    return (
        <div className="demo-container">
            {/* <div className="demo-toolbar">
                <span>Data file: </span>
                <select id={C_ID_select_data}>
                    <option value="timeData.json">timeData.json</option>
                    <option value="demo1.json">demo1.json</option>
                    <option value="demo2.json">demo2.json</option>
                    <option value="covidCzechDistricts.json">covid czech districts</option>
                    <option value="covidCzechDistrictsCumulative.json">covid czech districts (cumulative)</option>
                    <option value="covidCzechDistrictsCategoric.json">covid czech districts (categoric)</option>
                    <option disabled></option>
                </select>

                <span> or <input id={C_ID_check_data} type="checkbox"/> custom file: </span>
                <input id={C_ID_input_data} type="file" accept=".json" size={3}/>

                <input id={C_ID_check_config} type="checkbox"/>
                <span> Configuration file: </span>
                <input id={C_ID_input_config} type="file" accept=".json" size={3}/>

                <input id={C_ID_input_import} type="submit" value="import"/>
                <input id={C_ID_input_export} type="submit" value="export"/>
            </div> */}
            <div className="demo-map">
                <MyGeovistoMap
                    // ref={map}
                    id="my-new-geovisto-map"
                    data={Geovisto.getMapDataManagerFactory().json(data)}
                    geoData={Geovisto.getGeoDataManager([
                        Geovisto.getGeoDataFactory().geojson("world polygons", polygons),
                        Geovisto.getGeoDataFactory().geojson("world centroids", centroids),
                        Geovisto.getGeoDataFactory().geojson("czech polygons", polygons2),
                        Geovisto.getGeoDataFactory().geojson("czech centroids", centroids2)
                    ])}
                    // config={Geovisto.getMapConfigManagerFactory().default(config)}
                    globals={undefined}
                    templates={undefined}
                    
                >
                    
                    <ToolGroup>
                        <SidebarTool id={SIDEBAR_ID} label="Super cool sidebar">
                            <SidebarTab
                                tool={TILES_ID}
                                enabled={true}
                                name="[My] Seznam Map layer"
                                icon='<i class="fa fa-eur"></i>'
                                checkButton={true}
                            />
                            <SidebarTab
                                tool={TILES_ID + "2"}
                                enabled={true}
                                name="[My] OpenStreetMap layer"
                                icon='<i class="fa fa-won"></i>'
                                checkButton={true}
                            />
                            <SidebarTab
                                tool={CHOROPLETH_ID}
                                enabled={true}
                                name="[My] Choropleth"
                                icon='<i class="fa fa-usd"></i>'
                                checkButton={true}
                            />
                            <SidebarTab
                                tool={MARKER_ID}
                                enabled={true}
                                name="[My] MARKER"
                                icon='<i class="fa fa-gbp"></i>'
                                checkButton={true}
                            />
                        </SidebarTool>
                        <TilesLayerTool 
                            id={TILES_ID}
                            enabled={true}
                            label="Hi, this is tiles layer speaking"
                            baseMap={{
                                url:'https://mapserver.mapy.cz/turist-m/{z}-{x}-{y}',
                                maxZoom: 20,
                                maxNativeZoom: 19
                            }}
                        />
                        <TilesLayerTool 
                            id={TILES_ID + "2"}
                            enabled={false}
                            label="Hi, this is ANOTHER tiles layer speaking"
                            baseMap={{
                                url:'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                                // maxZoom: 20,
                                // maxNativeZoom: 19
                            }}
                        />
                        <ChoroplethLayerTool 
                            id={CHOROPLETH_ID} 
                            enabled={true} 
                        />
                        <MarkerLayerTool 
                            id={MARKER_ID}
                        />
                    </ToolGroup>
                    
                </MyGeovistoMap>
            </div>
        </div>
    );
}

export default {
    title: 'Demo',
    component: MyDemoFunctional,
} as Meta;

export const OwnGeovistoMapFunctional: Story = () => <MyDemoFunctional />;