// React
import React, { useMemo, useRef } from "react";

// Geovisto
import { GeovistoThemesTool, IMapTheme, IMapThemesManager } from 'geovisto-themes';
import { Geovisto, IGeoDataManager, IMapConfigManager, IMapDataManager } from 'geovisto';
import { ISidebarFragment, SidebarFragment } from 'geovisto-sidebar';

// Internal imports
import '../react/Constants';
import { ChoroplethLayerTool, ConnectionLayerTool, CustomTool, FiltersTool, SelectionTool,
         MarkerLayerTool, SidebarTool, ThemesTool, TilesLayerTool, SidebarTab, GeovistoMap, ToolGroup } from '../react/components';
import { IGeovistoMapHandle } from '../react/types';    
import { IImageLayerToolProps, ImageLayerTool } from '../storiesHelpers/imageLayerTool';

// Styles
import '../styles/common.scss';

// Data
import demo1 from '../../static/data/demo1.json';

// Polygons & Centroids
import polygons from '../../static/geo/country_polygons.json';
import polygons2 from '../../static/geo/czech_districts_polygons.json';
import centroids from '../../static/geo/country_centroids.json';
import centroids2 from '../../static/geo/czech_districts_centroids.json';

// Config
import config from '../../static/config/config.json';

const MapDemo = () : JSX.Element => {

    const map = useRef<IGeovistoMapHandle>(null);

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
    

    const dataManager = useMemo((): IMapDataManager => {
        return Geovisto.getMapDataManagerFactory().json(demo1);
    }, []); 
    
    const configManager = useMemo((): IMapConfigManager | undefined => {
        return Geovisto.getMapConfigManagerFactory().default(config);
    }, []); 

    const geoDataManager = useMemo((): IGeoDataManager => {
        return Geovisto.getGeoDataManager([
            Geovisto.getGeoDataFactory().geojson("world polygons", polygons),
            Geovisto.getGeoDataFactory().geojson("world centroids", centroids),
            Geovisto.getGeoDataFactory().geojson("czech polygons", polygons2),
            Geovisto.getGeoDataFactory().geojson("czech centroids", centroids2)
        ]);
    }, []); 

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
        <GeovistoMap
                ref={map}
                id='geovisto-map'
                className='geovisto-map-styles'
                data={dataManager}
                config={configManager}
                geoData={geoDataManager}
                globals={undefined}
                templates={undefined}
                >
            <ToolGroup>
                <SidebarTool 
                    id='geovisto-tool-sidebar'
                    enabled={true}
                >
                    <SidebarTab
                        enabled={true}
                        name="General settings"
                        icon='<i class="fa fa-gear"></i>'
                        checkButton={false}
                        fragments={fragments}
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
                    <SidebarTab
                        tool='geovisto-tool-filters'
                        enabled={true}
                        name='Filters'
                        icon='<i class="fa fa-filter"></i>'
                        checkButton={true}
                    />
                    <SidebarTab
                        tool='custom-tool-layer-image'
                        enabled={true}
                        name='Custom tool settings'
                        icon='<i class="fa fa-image"></i>'
                        checkButton={true}
                    />
                </SidebarTool>

                <CustomTool 
                        id='custom-tool-layer-image'
                        enabled={false}
                        url='https://i.pinimg.com/564x/e1/12/d8/e112d8ba7689be718fcef0985fea296c.jpg'
                        bounds={[[73.37895759245632, -54.7147379072844], [82.16679982188535, -19.997940517446235]]}
                        createTool={(props: IImageLayerToolProps) => new ImageLayerTool(props)}
                />
                <TilesLayerTool 
                    id='geovisto-tool-layer-tiles'
                    enabled={true}
                    label="Awesome tiles layer label"
                    baseMap={{
                        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                        maxZoom: 20,
                        maxNativeZoom: 19
                    }}
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
                <ThemesTool
                    id='geovisto-tool-themes'
                    manager={themesManager}
                    enabled={false}
                    theme={theme}
                />
            </ToolGroup>
        </GeovistoMap>
    );
};
