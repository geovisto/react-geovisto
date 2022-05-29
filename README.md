# React-Geovisto

A library providing set of React components to easily configure Geospatial Data Visualization created with [Geovisto toolkit](https://github.com/geovisto/geovisto). 

## Usage 

```jsx
const map = useRef(null);

const dataManager = useMemo(() => {
    return Geovisto.getMapDataManagerFactory().json([
        // list of data records (JSON structures)
        // ...
    ]);
}, []); 

const configManager = useMemo(() => {
    return Geovisto.getMapConfigManagerFactory().default({
        // initial configuration
    });
}, []); 

const geoDataManager = useMemo(() => {
    return Geovisto.getGeoDataManager([
        Geovisto.getGeoDataFactory().geojson("world polygons", {
            // GeoJSON definition
            // ...
        ),
        // other geographic data
        // ...
    ]);
}, []); 

const fragments = useMemo(() => {
    return [
        ['geovisto-selection-tool', new SidebarFragment({ enabled:true })]
        // other fragments definitions
        // ...
    ];
}, []);

return (
    <GeovistoMap
        ref={map}
        id='geovisto-map'
        className='geovisto-map-styles' // class with container dimensions
        data={dataManager}
        config={configManager}
        geoData={geoDataManager}
        {/* other properties that can be set... */}
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
                    tool='geovisto-choropleth-layer-tool'
                    enabled={true}
                    name='Choropleth layer settings'
                    icon='<i class="fa fa-th-large"></i>'
                    checkButton={true}
                />
                {/* other SidebarTab instances ...*/}
            </SidebarTool>
            <TilesLayerTool 
                id='geovisto-tiles-layer-tool'
                enabled={true}
                label="Tiles layer label"
                baseMap={baseMap}
                {/* other configurable props of the tool instance ...*/}
            />
            <ChoroplethLayerTool 
                id='geovisto-choropleth-layer-tool' 
                enabled={true}
                name='Choropleth layer'
            />
            <ConnectionLayerTool
                id='geovisto-connection-layer-tool'
                enabled={true}
            />
            <SelectionTool
                id='geovisto-selection-tool'
                enabled={true}
            />
            {/* other instances of Geovisto tools (extensions) which will be directly used in the map ...*/}
        </ToolGroup>
    </GeovistoMap>
);
```

## Installation

```
npm install --save react-geovisto
```

## Demo
To test usage of the components in the Storybook graphical interface, please run following command:

```
npm start
```

Storybook will then run the preview on localhost and port 6007: `http://localhost:6007/`.
