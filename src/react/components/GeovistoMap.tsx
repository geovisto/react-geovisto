import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Geovisto, IMap, IMapToolsManager } from '../..';
import { supportedTopLevelComponentTypes } from '../Constants';
import { useDidUpdateEffect } from '../Hooks';
import { IGeovistoMapHandle, IGeovistoMapProps, IToolGroupHandle } from '../types';
import { ToolGroup } from './ToolGroup';


// export const GeovistoMap = (props : IGeovistoMapProps) : JSX.Element => {
export const GeovistoMap = forwardRef<IGeovistoMapHandle, IGeovistoMapProps>((props, ref) : JSX.Element => {

    const [map, setMap] = useState<IMap>();
    const toolGroupRef = useRef<IToolGroupHandle>(null);

    // Expose map object to the user
    useImperativeHandle(ref, () => ({
        getMap: () => map 
    }));

    useEffect(() => {
        // ToolGroup is not specified -> render map with basic props only 
        if(!childrenWithRenderCallback?.some(el => el.type == ToolGroup)) {
            handleRenderCallback();
        }
    }, []);

    useDidUpdateEffect(() => {
        
        // ToolGroup is not specified -> render map with basic props only 
        const toolGroupPresent = childrenWithRenderCallback?.some(el => el.type == ToolGroup);

        if(toolGroupPresent) {
            // re-render the map through the tools (sidebar may be needed to re-render)
            !toolGroupRef.current?.rerenderTools();
        }
        else {
            handleRenderCallback();
        }

    }, [props.config,
        props.data,
        props.geoData,
        props.globals,
        props.templates
    ]);

    /*
     * Handles callback from children elements to render the map with current properties
     */
    const handleRenderCallback = (toolsManager? : IMapToolsManager) : IMap | undefined => {

        const mapProps = {...props, tools: toolsManager};
            
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
    };


    /**
     * Returns children elements with additional callback
     */
    const childrenWithRenderCallback = React.Children.map(props.children, (child, index) => {

        if (!React.isValidElement(child) || !supportedTopLevelComponentTypes.includes(child.type)) {
            
            console.warn(`Following element is not supported and will be skipped.`);
            console.warn(child);            
            return;
        }
            
        const newProps = {...child.props};
         
        newProps.key = index;
        newProps.onRenderChange = handleRenderCallback;

        if(child.type === ToolGroup) {
            newProps.ref = toolGroupRef;
        }

        return React.cloneElement(child, newProps, child.props.children);
    });


    return (
        <div id={props.id} className={props.className}>{childrenWithRenderCallback}</div>
    );
});