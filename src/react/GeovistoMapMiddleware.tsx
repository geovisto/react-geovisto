import React, { Children, useEffect, useState } from 'react'
import { Geovisto, IMap, IMapConfigManager, IMapProps, IMapToolsManager } from '..';
import { IGeovistoMapProps } from './components/Types';
import { useGeovistoContext } from './context/GeovistoContext';
import { GeovistoProvider } from './context/GeovistoContextProvider';


export const GeovistoMapMiddleware = (props: IGeovistoMapProps) : JSX.Element => {

    // const [map, setMap] = useState<IMap>();
    // let context = useGeovistoContext();

    // let map:IMap;

    // let ownProps: IMyGeovistoMapProps;
    //  React.forwardRef((props, ref)
    // useImperativeHandle(ref, () => ({
    //     getMap: () => {return map}
    //   }));
    
    // REDRAW USING CONTEXT
    // useEffect(() => {
    
    //     if(context.tools !== undefined)
    //     {
            
    //         const mapProps = {...props, tools: context.tools};
            
    //         // TODO: Maybe?
    //         // delete props.children;

    //         // TODO: Possibly map == null should cover both - null & undefined  
    //         if(map === undefined)
    //         {
    //             console.warn("--------------MAP DRAW--------------");
    //             console.log(mapProps);
                
    //             let mapObject = Geovisto.createMap(mapProps);
    
    //             setMap(mapObject);
                
    //             // draw map with the current config
    //             mapObject.draw(props.config ?? Geovisto.getMapConfigManagerFactory().default({}));
    //         }
    //         else
    //         {
    //             console.warn("--------------MAP RE-DRAW--------------");
    //             console.log(mapProps);

    //             // redraw map with the updated properties
    //             map.redraw(props.config ?? Geovisto.getMapConfigManagerFactory().default({}), mapProps);
    //         }
    //     }

    // }, [context.tools]);


    // // REDRAW USING CALLBACK
    // const handleRenderCallback = (toolsManager : IMapToolsManager) : IMapToolsManager | undefined => {


    //     console.log(toolsManager);

    //     if(toolsManager !== undefined)
    //     {
            
    //         const mapProps = {...props, tools: toolsManager};
            
    //         // TODO: Maybe?
    //         // delete props.children;

            
    //         // TODO: Possibly map == null should cover both - null & undefined  
    //         if(map === undefined)
    //         {
    //             console.warn("--------------MAP DRAW--------------");
    //             // console.log(mapProps);
                
    //             let mapObject = Geovisto.createMap(mapProps);
    
    //             setMap(mapObject);
                
    //             // Draw map with the current config
    //             mapObject.draw(props.config ?? Geovisto.getMapConfigManagerFactory().default({}));
    //             console.log(mapObject.getState())

    //             return mapObject.getState().getTools();
    //         }
    //         else
    //         {
    //             console.warn("--------------MAP RE-DRAW--------------");
    //             // console.log(mapProps);
                
    //             // Redraw map with the updated properties
    //             map.redraw(props.config ?? Geovisto.getMapConfigManagerFactory().default({}), mapProps);
    //             console.log(map.getState());

    //             return map.getState().getTools();
    //         }
    //     }
    // }

    // // Method adds callback to the childs
    // const childrenWithRenderCallback = React.Children.map(props.children, (child, index) => {

    //     if (!React.isValidElement(child))
    //     {
    //         return;
    //     } 
            
    //     let newProps = {...child.props};

    //     newProps.onRenderChange = handleRenderCallback

    //     return React.cloneElement(child, newProps, child.props.children);
    // });

    return (
        <></>
        // <div id={props.id} className={props.className}>{childrenWithRenderCallback}</div>
    );
}