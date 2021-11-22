import React from 'react'
import { Geovisto } from '..';
import { GeovistoSidebarTool } from '../tools';
import { useGeovistoContext } from './GeovistoContext';

interface IDataProps {
    data: unknown
}

export const Data: React.FC<IDataProps> = (props) => {

    // const context = useGeovistoContext();

    let {data} = useGeovistoContext();

    data = Geovisto.getMapDataManagerFactory().json(props.data);

    return <></>;
}