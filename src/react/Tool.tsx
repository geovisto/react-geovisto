import React from 'react'
import { GeovistoSidebarTool } from '../tools';
import { useGeovistoContext } from './GeovistoContext';

interface IToolProps {
    id: string
}

export const Tool: React.FC<IToolProps> = ({}) => {

    // const context = useGeovistoContext();

    const context = useGeovistoContext();

    // context?.tools?.add(GeovistoSidebarTool.createTool({
    //     id: "geovisto-tool-sidebar",
    // }),)

    return <></>;
}