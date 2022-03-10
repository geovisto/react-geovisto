import React, { useState } from 'react'
import { Geovisto, IMap, IMapToolsManager } from '..';
import { IGeovistoMapProps } from './components/Types';


export const GeovistoMap = (props : IGeovistoMapProps) : JSX.Element => {

    const [map, setMap] = useState<IMap>();
    // let context = useGeovistoContext();

    // let map:IMap;

    // let ownProps: IMyGeovistoMapProps;
    //  React.forwardRef((props, ref)
    // useImperativeHandle(ref, () => ({
    //     getMap: () => {return map}
    //   }));
    



    // REDRAW USING CALLBACK
    // const handleRenderCallback = (toolsManager : IMapToolsManager) : IMapToolsManager | undefined => {
    const handleRenderCallback = (toolsManager : IMapToolsManager) : IMap | undefined => {

        console.log(toolsManager);

        if(toolsManager !== undefined)
        {
            
            const mapProps = {...props, tools: toolsManager};
            
            // TODO: Maybe?
            // delete props.children;

            
            // TODO: Possibly map == null should cover both - null & undefined  
            if(map === undefined)
            {
                console.warn("--------------MAP DRAW--------------");
                // console.log(mapProps);
                
                let mapObject = Geovisto.createMap(mapProps);
    
                setMap(mapObject);
                
                // Draw map with the current config
                mapObject.draw(props.config ?? Geovisto.getMapConfigManagerFactory().default({}));
                
                console.log(mapObject);
                console.log(mapObject.getState());

                // return mapObject.getState().getTools();
                return mapObject as IMap;
            }
            else
            {
                console.warn("--------------MAP RE-DRAW--------------");
                // console.log(mapProps);
                
                // Redraw map with the updated properties
                map.redraw(props.config ?? Geovisto.getMapConfigManagerFactory().default({}), mapProps);
                console.log(map.getState());

                // return map.getState().getTools();
                return map;
            }
        }
    }


    // Method adds callback to the children
    const childrenWithRenderCallback = React.Children.map(props.children, (child, index) => {

        if (!React.isValidElement(child))
            return;
            
        let newProps = {...child.props};
        newProps.onRenderChange = handleRenderCallback

        return React.cloneElement(child, newProps, child.props.children);
    });


    return (
        <div id={props.id} className={props.className}>{childrenWithRenderCallback}</div>
    );
}