import React, { Children, RefObject, useContext, useEffect, useImperativeHandle, useState } from 'react'
import { Geovisto, IMap, IMapConfigManager, IMapProps } from '..';
import { IGeovistoMapProps } from './components/Types';
import { useGeovistoContext } from './context/GeovistoContext';
import { GeovistoProvider } from './context/GeovistoContextProvider';
import { GeovistoMapMiddleware } from './GeovistoMapMiddleware';


export const GeovistoMap: React.FC<IGeovistoMapProps> = (props) => {

    return (
        <GeovistoProvider>
            <GeovistoMapMiddleware {...props} />
        </GeovistoProvider>
    );
}