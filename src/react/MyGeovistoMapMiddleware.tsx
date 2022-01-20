import React, { useEffect, useState } from 'react'
import { Geovisto, IMap, IMapConfigManager, IMapProps } from '..';
import { useGeovistoContext } from './context/GeovistoContext';
import { GeovistoProvider } from './context/GeovistoContextProvider';


export type IMyGeovistoMapProps = IMapProps & {
    // ref: RefObject<typeof MyGeovistoMap>,
    config?: IMapConfigManager
}
export const MyGeovistoMapMiddleware: React.FC<IMyGeovistoMapProps> = (props) => {

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
    
        // console.log(context);
        // context = {...props};

        // setOwnProps({...props});

        // console.log(props);

      
    }, []);

    
    useEffect(() => {
    
        console.log(props);
        
        const propsCopy = {...props};

        if(context.tools !== undefined && context.data !== undefined)
        {
            propsCopy.tools = context.tools;
            propsCopy.data = context.data;

            if(map == null)
            {
                let map = Geovisto.createMap({...propsCopy});
    
                setMap(map);
                
                // draw map with the current config
                map.draw(propsCopy.config ?? Geovisto.getMapConfigManagerFactory().default({}));
            }
        }

        console.log(propsCopy);


    }, [context.tools, context.data]);


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
        <div id={props.id} className='geovisto-map' >{props.children}</div>
    );
}