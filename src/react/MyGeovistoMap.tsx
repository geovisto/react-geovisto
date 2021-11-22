import React, { Children, RefObject, useContext, useEffect, useImperativeHandle, useState } from 'react'
import { Geovisto, IMap, IMapConfigManager, IMapProps } from '..';
import { GeovistoProvider, useGeovistoContext } from './GeovistoContext';

export type IMyGeovistoMapProps = IMapProps & {
    // ref: RefObject<typeof MyGeovistoMap>,
    config?: IMapConfigManager
}
export const MyGeovistoMap: React.FC<IMyGeovistoMapProps> = (props) => {

    const [map, setMap] = useState<IMap>();
    let context = useGeovistoContext();
    // const [templates, globals, data, geoData, tools, config] = useGeovistoContext();

    const [ownProps, setOwnProps] = useState<IMyGeovistoMapProps>();
    
    // let ownProps: IMyGeovistoMapProps;
    //  React.forwardRef((props, ref)
    // useImperativeHandle(ref, () => ({
    //     getMap: () => {return map}
    //   }));

    useEffect(() => {
        document.title = `Hello World!`;

        console.log(context);


        // context = {...props};

        setOwnProps({...props});

        console.log(props);

        if(map == null)
        {
            let map = Geovisto.createMap(props);

            setMap(map);
            
            // draw map with the current config
            map.draw(props.config ?? Geovisto.getMapConfigManagerFactory().default({}));
        }
    }, []);


    useEffect(() => {

        // TODO: resolve unnecessary redrawing 
        console.log("changed");

        if(map != undefined){

            console.log("called rewrite");
            map.redraw(props.config ?? Geovisto.getMapConfigManagerFactory().default({}), props);
        }

    }, [map]);

    useEffect(() => {

        // TODO: resolve unnecessary redrawing 
        console.log(context.data);

    }, [context.data]);

    return (
        <GeovistoProvider value={context}>
            <div id={props.id} className='geovisto-map' >{props.children}</div>
        </GeovistoProvider>
    );
}