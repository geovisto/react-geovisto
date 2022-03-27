import React, { useState } from 'react';
import { Geovisto, IMap, IMapToolsManager } from '../..';
import { IGeovistoMapProps } from '../types';


export const GeovistoMap = (props : IGeovistoMapProps) : JSX.Element => {

    const [map, setMap] = useState<IMap>();
    // let context = useGeovistoContext();

    // let map:IMap;

    // let ownProps: IMyGeovistoMapProps;
    //  React.forwardRef((props, ref)
    // useImperativeHandle(ref, () => ({
    //     getMap: () => {return map}
    //   }));

    /*
     * Handles callback from children elements to render the map with current properties
     */
    const handleRenderCallback = (toolsManager : IMapToolsManager) : IMap | undefined => {

        if(toolsManager !== undefined)
        {
            const mapProps = {...props, tools: toolsManager};
            
            // TODO: Possibly map == null should cover both - null & undefined  
            if(map === undefined)
            {
                console.warn("--------------MAP DRAW--------------");
                
                const mapObject = Geovisto.createMap(mapProps);
                setMap(mapObject);
                
                // Draw map with the current config
                mapObject.draw(props.config ?? Geovisto.getMapConfigManagerFactory().default({}));                
                console.log(mapObject.getState());

                return mapObject as IMap;
            }
            else
            {
                console.warn("--------------MAP RE-DRAW--------------");
                
                // Redraw map with the updated properties
                map.redraw(props.config ?? Geovisto.getMapConfigManagerFactory().default({}), mapProps);
                console.log(map.getState());

                return map;
            }
        }
    };


    /**
     * Returns children elements with additional callback
     */
    const childrenWithRenderCallback = React.Children.map(props.children, (child, index) => {

        if (!React.isValidElement(child))
            return;
            
        const newProps = {...child.props};
         
        newProps.key = index;
        newProps.onRenderChange = handleRenderCallback;

        return React.cloneElement(child, newProps, child.props.children);
    });


    return (
        <div id={props.id} className={props.className}>{childrenWithRenderCallback}</div>
    );
};