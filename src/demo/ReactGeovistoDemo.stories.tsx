// Storybook
import {
    Story,
    Meta
} from '@storybook/react/types-6-0';

// React
import React, { useEffect, useMemo, useRef, useState } from "react";

import { GeovistoMap } from "../react/components/GeovistoMap";

import './Demo.scss';

import { Geovisto, GeovistoThemesTool, IGeoDataManager, IMapDataManager, IMapTheme, IMapThemesManager, IMapTilesModel, ISidebarFragment, SidebarFragment } from '..';

import { CHOROPLETH_ID, CONNECTION_ID, FILTERS_ID, MARKER_ID, SELECTION_ID, SIDEBAR_ID, THEMES_ID, TILES_ID } from '../react/Constants';

import { ConnectionLayerTool, ChoroplethLayerTool, MarkerLayerTool, SidebarTab, 
         SidebarTool, ThemesTool, TilesLayerTool, ToolGroup, SelectionTool, FiltersTool } from '../react/components/index';



import polygons from '../../static/geo/country_polygons.json';
import polygons2 from '../../static/geo/czech_districts_polygons.json';
import centroids from '../../static/geo/country_centroids.json';
import centroids2 from '../../static/geo/czech_districts_centroids.json';

// import demoData from '../../static/data/covidCzechDistricts.json';
import demoData from '../../static/data/demo1.json';
import demoConfig from '../../static/config/config.json';
import { CustomTool } from '../react/components/CustomTool';
import { BlueSkyLayerTool, IBlueSkyLayerToolProps } from '../tools/layers/bluesky';
import { IGeovistoMapHandle } from '../react/types';

const ReactGeovistoDemo = () : JSX.Element => {

    // implicit data
    const [data, setData] = useState<unknown>(demoData);

    // implicit config
    const [config, setConfig] = useState<Record<string, unknown>>(demoConfig);

    const map = useRef<IGeovistoMapHandle>(null);

    const basemap1 = {
        url:'https://mapserver.mapy.cz/turist-m/{z}-{x}-{y}',
        maxZoom: 20,
        maxNativeZoom: 19
    };

    const basemap2 = {
        url:'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    };

    const [enableToggle, setEnableToggle] = useState(true);
    const [enableCustomToolToggle, setEnableCustomToolToggle] = useState(true);
    const [enableThemesToolToggle, setEnableThemesToolToggle] = useState(false);
    const [stringToggle, setStringToggle] = useState("string111");
    const [idToggle, setIdToggle] = useState(TILES_ID);
    const [idToggle2, setIdToggle2] = useState(CHOROPLETH_ID);
    const [idToggle3, setIdToggle3] = useState(SIDEBAR_ID);
    const [idToggle4, setIdToggle4] = useState(THEMES_ID);
    const [idUndefinedToggle, setIdUndefinedToggle] = useState(TILES_ID + "2");
    const [iconToggle, setIconToggle] = useState('<i class="fa fa-try" aria-hidden="true"></i>');
    const [basemapToggle, setBasemapToggle] = useState<IMapTilesModel>(basemap1);
    const [enableSidebarToggle, setEnableSidebarToggle] = useState(true);
    const [enableSidebarTabToggle, setEnableSidebarTabToggle] = useState(true);
    const [imageToggle, setImageToggle] = useState('https://cdn.xsd.cz/resize/6bbae9c4cff83ba7a9bdc895ed37caac_resize=900,525_.jpg?hash=ca48d5243fd1f8f2e2285f33d02e2b9b');

    const C_ID_select_data = "leaflet-combined-map-select-data";
    const C_ID_check_data = "leaflet-combined-map-check-data";
    const C_ID_input_data = "leaflet-combined-map-input-data";
    const C_ID_check_config = "leaflet-combined-map-check-config";
    const C_ID_input_config = "leaflet-combined-map-input-config";
    const C_ID_input_import = "leaflet-combined-map-input-import";
    const C_ID_input_export = "leaflet-combined-map-input-export";

    useEffect(() => {
        // map.current.getMap().redraw(map.current.getMap().getProps(), )
    }, [data, config]);
    

    useEffect(() => {
        
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
        const inputData = {
            json: undefined
        };
        const dataPathSubmitted = function(this: HTMLInputElement) {
            console.log(this.files);
            pathSubmitted(this.files[0], inputData);
        };
        document.getElementById(C_ID_input_data).addEventListener('change', dataPathSubmitted, false);
        
        // process config path
        const inputConfig = {
            json: undefined
        };
        const configPathSubmitted = function(this: HTMLInputElement) {
            console.log(this.files);
            pathSubmitted(this.files[0], inputConfig);
        };
        document.getElementById(C_ID_input_config).addEventListener('change', configPathSubmitted, false);

        // ------ import ------ //

        // import action
        const importAction = (e: MouseEvent) => {

            console.log(e);
            console.log("data: ", data);
            console.log("config: ", config);

            // process data json
            if(!(document.getElementById(C_ID_check_data) as HTMLInputElement).checked || inputData.json == undefined) {
                const fileName = (document.getElementById(C_ID_select_data) as HTMLInputElement).value;
                console.log(fileName);
                inputData.json = require('/static/data/' + fileName);
            }
            
            // process config json
            if(!(document.getElementById(C_ID_check_config) as HTMLInputElement).checked || inputConfig.json == undefined) {
                inputConfig.json = require('/static/config/config.json');
            }

            // update state
            setData(inputData.json);
            setConfig(inputConfig.json);
        };

        document.getElementById(C_ID_input_import).addEventListener('click', importAction);

        // ------ export ------ //
        
        // export action
        const exportAction = (e: MouseEvent) => {
            console.log(e);
            
            // expert map configuration
            const config = JSON.stringify(map!.current.getMap().export(), null, 2);
            
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

    }, []);
    

    const dataManager = useMemo((): IMapDataManager => {
        return Geovisto.getMapDataManagerFactory().json(data);
     }, [data]); 

     const geoDataManager = useMemo((): IGeoDataManager => {
        return Geovisto.getGeoDataManager([
            Geovisto.getGeoDataFactory().geojson("world polygons", polygons),
            Geovisto.getGeoDataFactory().geojson("world centroids", centroids),
            Geovisto.getGeoDataFactory().geojson("czech polygons", polygons2),
            Geovisto.getGeoDataFactory().geojson("czech centroids", centroids2)
        ]);
     }, [data]); 

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
    
    const theme = useMemo(() : IMapTheme => {
        return GeovistoThemesTool.createThemeDark3();
     }, []);  

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
            </div>

            <div className='btn-container'>
                <button onClick={() => setEnableToggle(!enableToggle)}>{enableToggle ? "true" : "false"}</button>
                <button onClick={() => setStringToggle(current => current == "string222" ? "string111" : "string222")}>{stringToggle}</button>
                <button onClick={() => setIconToggle(current => current == '<i class="fa fa-ils" aria-hidden="true"></i>' ? '<i class="fa fa-try" aria-hidden="true"></i>' : '<i class="fa fa-ils" aria-hidden="true"></i>')}>{iconToggle == '<i class="fa fa-ils" aria-hidden="true"></i>' ? <i className="fa fa-ils" aria-hidden="true"></i> : <i className="fa fa-try" aria-hidden="true"></i>}</button>
                <button onClick={() => setBasemapToggle(current => current.url == basemap1.url ? basemap2 : basemap1)}>{basemapToggle.url == basemap1.url ? "Seznam maps" : "Openstreet maps"}</button>
                <button onClick={() => setEnableSidebarToggle(!enableSidebarToggle)}>{"Sidebar: " + (enableSidebarToggle ? "true" : "false")}</button>
                <button onClick={() => setEnableSidebarTabToggle(!enableSidebarTabToggle)}>{"SidebarTab: " + (enableSidebarTabToggle ? "true" : "false")}</button>
                <button onClick={() => setIdToggle(id => id == TILES_ID ? `${TILES_ID}-edited` : TILES_ID)}>{idToggle}</button>
                <button onClick={() => setIdToggle2(id => id == CHOROPLETH_ID ? `${CHOROPLETH_ID}-edited` : CHOROPLETH_ID)}>{idToggle2}</button>
                <button onClick={() => setIdToggle3(id => id == SIDEBAR_ID ? `${SIDEBAR_ID}-edited` : SIDEBAR_ID)}>{idToggle3}</button>
                <button onClick={() => setIdToggle4(id => id == THEMES_ID ? `${THEMES_ID}-edited` : THEMES_ID)}>{idToggle4}</button>
                <button onClick={() => setIdUndefinedToggle(id => id === undefined ? TILES_ID + '2' : undefined)}>{idUndefinedToggle ? `id (${TILES_ID}2)`  : 'undefined'}</button>
                <button onClick={() => setEnableCustomToolToggle(!enableCustomToolToggle)}>Custom tool: {enableCustomToolToggle ? "true" : "false"}</button>
                <button onClick={() => setEnableThemesToolToggle(!enableThemesToolToggle)}>Themes tool: {enableThemesToolToggle ? "true" : "false"}</button>
                <button onClick={() => setImageToggle(img => img == 'https://cdn.xsd.cz/resize/6bbae9c4cff83ba7a9bdc895ed37caac_resize=900,525_.jpg?hash=ca48d5243fd1f8f2e2285f33d02e2b9b'
                                                                    ? 'https://assets.mugglenet.com/wp-content/uploads/2015/12/Lord-Voldemort-with-wand.jpg'
                                                                    : 'https://cdn.xsd.cz/resize/6bbae9c4cff83ba7a9bdc895ed37caac_resize=900,525_.jpg?hash=ca48d5243fd1f8f2e2285f33d02e2b9b')}>
                                                                        {imageToggle == 'https://cdn.xsd.cz/resize/6bbae9c4cff83ba7a9bdc895ed37caac_resize=900,525_.jpg?hash=ca48d5243fd1f8f2e2285f33d02e2b9b' ? 
                                                                        'Tom Riddle: War' : 'Tom Riddle: Calm'}</button>
            </div>

            <div className="demo-map">
                <GeovistoMap
                    ref={map}
                    id="my-new-geovisto-map"
                    className="geovisto-map"
                    data={dataManager}
                    geoData={geoDataManager}
                    // config={Geovisto.getMapConfigManagerFactory().default(config)}
                    globals={undefined}
                    templates={undefined}
                >
                    <ToolGroup>
                        <SidebarTool id={idToggle3} label="label" enabled={enableSidebarToggle}>
                            <SidebarTab
                                enabled={true}
                                name="General settings"
                                icon='<i class="fa fa-gear"></i>'
                                checkButton={false}
                                // fragments={[
                                // [ "geovisto-tool-themes",
                                //     new SidebarFragment({ enabled:true })
                                // ],
                                // [ "geovisto-tool-selection",
                                //     new SidebarFragment({ enabled:true })
                                // ]]}
                            />
                            {/* <SidebarTab
                                tool={THEMES_ID}
                                enabled={true}
                                name="[My] Themes"
                                icon='<i class="fa fa-btc"></i>'
                                checkButton={false}
                            /> */}
                            <SidebarTab
                                tool={TILES_ID}
                                enabled={enableSidebarTabToggle}
                                name={stringToggle}
                                icon={iconToggle}
                                checkButton={true}
                            /> 
                            {/* <SidebarTab
                                tool={TILES_ID + "2"}
                                enabled={true}
                                name="[My] OpenStreetMap layer"
                                icon='<i class="fa fa-won"></i>'
                                checkButton={true}
                            /> */}
                            <SidebarTab
                                tool={idToggle2}
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
                            <SidebarTab
                                tool='my-bluesky-tool'
                                enabled={true}
                                name="[My] Blue sky tool"
                                icon='<i class="fa fa-image"></i>'
                                checkButton={true}
                            />
                            <SidebarTab
                                tool={CONNECTION_ID}
                                enabled={true}
                                name="[My] Connection layer"
                                icon='<i class="fa fa-inr"></i>'
                                checkButton={true}
                            />
                            <SidebarTab
                                tool={FILTERS_ID}
                                enabled={true}
                                name="[My] Filter tool"
                                icon='<i class="fa fa-filter"></i>'
                                checkButton={true}
                            />
                        </SidebarTool>
                        <TilesLayerTool 
                                id={idToggle}
                                enabled={enableToggle}
                                // enabled={true}
                                label={"Awesome tiles layer label"}
                                baseMap={basemapToggle}
                                // baseMap={{
                                //     url:'https://mapserver.mapy.cz/turist-m/{z}-{x}-{y}',
                                //     maxZoom: 20,
                                //     maxNativeZoom: 19
                                // }}
                            />
                        <TilesLayerTool 
                            id={idUndefinedToggle}
                            enabled={false}
                            label="Awesome tiles layer label"
                            // baseMap={{
                            //     url:'https://mapserver.mapy.cz/turist-m/{z}-{x}-{y}',
                            //     maxZoom: 20,
                            //     maxNativeZoom: 19
                            // }}
                        />
                        {/* <TilesLayerTool 
                            id={TILES_ID + "2"}
                            enabled={false}
                            label="Hi, this is ANOTHER tiles layer speaking"
                            baseMap={{
                                url:'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                                // maxZoom: 20,
                                // maxNativeZoom: 19
                            }}
                        /> */}
                        <ChoroplethLayerTool 
                            id={idToggle2} 
                            icon="whatever"
                            label="label"
                            enabled={true}
                        />
                        <MarkerLayerTool 
                            id={MARKER_ID}
                            enabled={true}
                        />
                        <ConnectionLayerTool
                            id={CONNECTION_ID}
                            enabled={true}
                        />
                        <SelectionTool
                            id={SELECTION_ID}
                        />
                        <FiltersTool
                            id={FILTERS_ID}
                        />
                        <CustomTool 
                            id='my-bluesky-tool'
                            enabled={enableCustomToolToggle}
                            url={imageToggle}
                            bounds={[[51.56780513284899, 34.91589171866554], [75.35329470271482, 134.69164254727792]]}
                            createTool={(props: IBlueSkyLayerToolProps) => new BlueSkyLayerTool(props)}
                        />
                        <CustomTool 
                            id='my-bluesky-tool-2'
                            enabled={enableCustomToolToggle}
                            url={'https://i.imgur.com/px5ppBp.jpeg'}
                            bounds={[[37.33745868636446, -5.501782667654866], [57.44847414902792, 47.54821100010345]]}
                            createTool={(props: IBlueSkyLayerToolProps) => new BlueSkyLayerTool(props)}
                        />
                        <ThemesTool
                            id={idToggle4}
                            manager={themesManager}
                            enabled={enableThemesToolToggle}
                            theme={theme}
                        />
                    </ToolGroup>
                    
                </GeovistoMap>
            </div>
        </div>
    );
};

export default {
    title: 'Maps',
    component: ReactGeovistoDemo,
} as Meta;

export const ReactGeovistoMap: Story = () => <ReactGeovistoDemo />;