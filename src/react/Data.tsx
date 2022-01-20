import React, { useEffect } from 'react'
import { Geovisto } from '..';
import { GeovistoSidebarTool } from '../tools';
import { useGeovistoContext } from './context/GeovistoContext';

interface IDataProps {
    data: unknown
}

export const Data: React.FC<IDataProps> = ({data}) => {

    const context = useGeovistoContext();

    useEffect(() => {
        const result = Geovisto.getMapDataManagerFactory().json(data);
        context.setData(result);
    }, []);

    return <></>;
}