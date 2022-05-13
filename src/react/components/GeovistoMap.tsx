import React, { forwardRef, ReactElement, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { Geovisto, IMap, IMapToolsManager, MapConfigManagerFactory } from 'geovisto';

import { supportedTopLevelComponentTypes } from '../Constants';
import { useDidUpdateEffect } from '../Hooks';
import { IGeovistoMapHandle, IGeovistoMapProps, IToolGroupHandle } from '../types';
import { ToolGroup } from './ToolGroup';

export const GeovistoMap = forwardRef<IGeovistoMapHandle, IGeovistoMapProps>((props, ref) : JSX.Element => {

    const [map, setMap] = useState<IMap>();
    const toolGroupRef = useRef<IToolGroupHandle>(null);
    let mapInitialized = false;

    const mapxy = useRef<IMap>();

    // Expose map object to the user
    useImperativeHandle(ref, () => ({
        getMap: () => map 
    }));

    useEffect(() => {
        // ToolGroup is not specified -> render map with basic props only 
        if(!childrenWithRenderCallback?.some((el : ReactElement) => supportedTopLevelComponentTypes.includes(el.type))) {
            handleRenderCallback();
        }
    }, []);

    useDidUpdateEffect(() => {
        
        // ToolGroup is not specified -> render map with basic props only 
        const toolGroupPresent = childrenWithRenderCallback?.some((el : ReactElement) => el.type == ToolGroup);

        if(toolGroupPresent) {
            // re-render the map through the tools (sidebar may be needed to re-render)
            toolGroupRef.current?.rerenderTools();
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

        const mapProps = toolsManager ? {...props, tools: toolsManager} : {...props};
            
        console.warn(map);
        console.warn(mapInitialized);

        // TODO: Change this
        console.log(mapxy.current);
        if(mapxy.current == undefined)
        {
            console.warn("--------------MAP DRAW--------------");
            
            const mapObject = Geovisto.createMap(mapProps);
            mapInitialized = true;
            // setMap(mapObject);
            mapxy.current = mapObject;
            
            // Draw map with the current config
            mapxy.current.draw(props.config ?? Geovisto.getMapConfigManagerFactory().default({}));                
            
            return mapxy.current as IMap;
        }
        else
        {
            console.warn("--------------MAP RE-DRAW--------------");
        
            // Redraw map with the updated properties
            mapxy.current.redraw(props.config ?? Geovisto.getMapConfigManagerFactory().default({}), mapProps);

            return mapxy.current;
        }
    };


    /**
     * Detach the map container on component unmount
     */
    const detachMapContainerOnUnmount = (id: string) => {
        const willMount = useRef(true)
    
        // Remove the map container, co it can be initialized again in the future
        if (willMount.current) {
            console.error("Called");
            document.getElementById(id)?.remove();
        }
    
        willMount.current = false
    }

    detachMapContainerOnUnmount(props.id);


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
        
        // Add ref to ToolGroup component
        if(child.type === ToolGroup) {
            newProps.ref = toolGroupRef;
        }
        
        return React.cloneElement(child, newProps, child.props.children);
    });


    return (
        <div className={props.className}>

        <div id={props.id}  style={{height: '100%'}}>{childrenWithRenderCallback}</div>
        </div>
    );
});