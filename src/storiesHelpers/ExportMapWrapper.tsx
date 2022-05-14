// Storybook

// React
import React, { useMemo, useRef } from "react";

// Geovisto
import { Geovisto, IGeoDataManager, IMapConfigManager, IMapDataManager } from 'geovisto';

// Internal imports
import '../react/Constants';
import { GeovistoMap, TilesLayerTool, ToolGroup } from '../react/components/';
import { IGeovistoMapHandle } from '../react/types';

// Data
import demo1 from '../../static/data/demo1.json';

// Polygons & Centroids
import polygons from '../../static/geo/country_polygons.json';
import polygons2 from '../../static/geo/czech_districts_polygons.json';
import centroids from '../../static/geo/country_centroids.json';
import centroids2 from '../../static/geo/czech_districts_centroids.json';

export const ExportMapWrapper = (props: any) : JSX.Element => {

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
        return Geovisto.getMapDataManagerFactory().json(props.data ?? demo1);
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

    return (
        <React.Fragment>
            <GeovistoMap
                ref={map}
                id={props.mapId ?? 'geovisto-map'}
                className={props.mapClassName ?? 'geovisto-map-styles'}
                data={dataManager}
                config={configManager}
                geoData={geoDataManager}
                globals={undefined}
                templates={undefined}
                >
                <ToolGroup>
                    {/* Base tiles layer - remove if you want to debug the tool only */}
                    <TilesLayerTool id='demo-base-map' enabled={props.showBaseTileLayerMap}/>

                    {props.children}
                </ToolGroup>
            </GeovistoMap>

            <div className='demo-footer'>
                <div>
                    <button className='export-btn' onClick={exportAction}>Export</button>
                </div>
            </div>
        </React.Fragment>
    );
};