import React, { Children, RefObject, useContext, useEffect, useImperativeHandle, useState } from 'react'
import { Geovisto, IMap, IMapConfigManager, IMapProps } from '..';
import { useGeovistoContext } from './context/GeovistoContext';
import { GeovistoProvider } from './context/GeovistoContextProvider';
import { MyGeovistoMapMiddleware } from './MyGeovistoMapMiddleware';


export type IMyGeovistoMapProps = IMapProps & {
    // ref: RefObject<typeof MyGeovistoMap>,
    config?: IMapConfigManager
}
export const MyGeovistoMap: React.FC<IMyGeovistoMapProps> = (props) => {


    // useEffect(() => {

    //     // TODO: resolve unnecessary redrawing 
    //     console.log("changed");

    //     if(map != undefined){

    //         console.log("called rewrite");
    //         map.redraw(props.config ?? Geovisto.getMapConfigManagerFactory().default({}), props);
    //     }

    // }, [map]);

    // context.registerAddToolHandler((tool) => console.log(tool));

    // useEffect(() => {

    //     // TODO: resolve unnecessary redrawing 
    //     console.log(context.data);

    // }, [context.data]);

    return (
        <GeovistoProvider>
            <MyGeovistoMapMiddleware {...props} />
        </GeovistoProvider>
    );
}