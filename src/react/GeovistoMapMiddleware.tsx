import React, { useEffect, useState } from 'react'
import { Geovisto, IMap, IMapConfigManager, IMapProps } from '..';
import { IGeovistoMapProps } from './components/Types';
import { useGeovistoContext } from './context/GeovistoContext';
import { GeovistoProvider } from './context/GeovistoContextProvider';


export const GeovistoMapMiddleware: React.FC<IGeovistoMapProps> = (props) => {

    const [map, setMap] = useState<IMap>();
    let context = useGeovistoContext();

    // let map:IMap;

    // let ownProps: IMyGeovistoMapProps;
    //  React.forwardRef((props, ref)
    // useImperativeHandle(ref, () => ({
    //     getMap: () => {return map}
    //   }));
    
    useEffect(() => {
    
    
        if(context.tools !== undefined)
        {
            
            const mapProps = {...props, tools: context.tools};
            // TODO: Maybe?
            // delete props.children;

            // TODO: Possibly map == null should cover both - null & undefined  
            if(map === undefined)
            {
                console.warn("--------------MAP DRAW--------------");
                console.log(context.tools);
                
                let mapObject = Geovisto.createMap(mapProps);
    
                setMap(mapObject);
                
                // draw map with the current config
                mapObject.draw(props.config ?? Geovisto.getMapConfigManagerFactory().default({}));
            }
            else
            {
                console.warn("--------------MAP RE-DRAW--------------");
                console.log(context.tools);

                // redraw map with the updated properties
                map.redraw(props.config ?? Geovisto.getMapConfigManagerFactory().default({}), mapProps);
            }
        }

    }, [context.tools]);


    return (
        <div id={props.id} className={props.className} >{props.children}</div>
    );
}