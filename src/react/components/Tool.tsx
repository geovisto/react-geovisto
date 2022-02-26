import React, { useEffect } from 'react'
import { Geovisto } from '..';
import { useGeovistoContext } from './context/GeovistoContext';

// Geovisto Tools
import {
    GeovistoSidebarTool,
    GeovistoFiltersTool,
    GeovistoThemesTool,
    GeovistoSelectionTool,
    GeovistoTilesLayerTool,
    GeovistoChoroplethLayerTool,
    GeovistoMarkerLayerTool,
    GeovistoConnectionLayerTool
} from '../tools';
import { ToolType } from './Tool.types';

export interface IToolProps {
    id: string
    type: ToolType
}

export const Tool: React.FC<IToolProps> = ({}) => {

    // const context = useGeovistoContext();

    // const manager = Geovisto.createMapToolsManager([
    //     GeovistoSidebarTool.createTool({
    //         id: "geovisto-tool-sidebar",
    //     }),
    //     GeovistoFiltersTool.createTool({
    //         id: "geovisto-tool-filters",
    //         manager: GeovistoFiltersTool.createFiltersManager([
    //             // filter operations
    //             GeovistoFiltersTool.createFilterOperationEq(),
    //             GeovistoFiltersTool.createFilterOperationNeq(),
    //             GeovistoFiltersTool.createFilterOperationReg()
    //         ])
    //     }),
    //     GeovistoThemesTool.createTool({
    //         id: "geovisto-tool-themes",
    //         manager: GeovistoThemesTool.createThemesManager([
    //             // style themes
    //             GeovistoThemesTool.createThemeLight1(),
    //             GeovistoThemesTool.createThemeLight2(),
    //             GeovistoThemesTool.createThemeLight3(),
    //             GeovistoThemesTool.createThemeDark1(),
    //             GeovistoThemesTool.createThemeDark2(),
    //             GeovistoThemesTool.createThemeDark3(),
    //             GeovistoThemesTool.createThemeBasic()
    //         ])
    //     }),
    //     GeovistoSelectionTool.createTool({
    //         id: "geovisto-tool-selection"
    //     }),
    //     GeovistoTilesLayerTool.createTool({
    //         id: "geovisto-tool-layer-map"
    //     }),
    //     GeovistoChoroplethLayerTool.createTool({
    //         id: "geovisto-tool-layer-choropleth"
    //     }),
    //     GeovistoMarkerLayerTool.createTool({
    //         id: "geovisto-tool-layer-marker"
    //     }),
    //     GeovistoConnectionLayerTool.createTool({
    //         id: "geovisto-tool-layer-connection"
    //     }),
    // ]);


    // useEffect(() => {
    //     context.setTools(manager);
    //     context.setSample("Hello World!");
    // }, []);


    // console.log("Greetings from Tool component");
    // context.invokeAddToolHandler({id: "XOXOXOXOOX"} as IToolProps);

    // context?.tools?.add(GeovistoSidebarTool.createTool({
    //     id: "geovisto-tool-sidebar",
    // }),)

    return <></>;
}