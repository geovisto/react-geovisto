// React
import React, { Component } from "react";

// Geovisto
import { Geovisto } from "../model/internal/api/Geovisto";
import IMap from "../model/types/map/IMap";
import IReactGeovistoMapProps from "./IReactGeovistoMapProps";

// styles
import '../styles/common.scss';


/**
 * React component which wraps Geovisto map.
 * 
 * @author Jiri Hynek
 */
class ReactGeovistoMap extends Component<IReactGeovistoMapProps, Record<string, never>> {
    
    private m: IMap | null;

    /**
     * Initializes object.
     * 
     * @param props 
     */
    public constructor(props: IReactGeovistoMapProps) {
        super(props);

        console.log(props);

        if(props.id == undefined) props.id = this.getDefaultId();

        this.m = null;
    }

    /**
     * It returns Geovisto map.
     */
    public getMap(): IMap | null {
        return this.m;
    }

    /**
     * It returns a default id used for Geovisto map container.
     */
    private getDefaultId(): string {
        return 'my-geovisto-map';
    }

    /**
     * It returns a default class name used for Geovisto map container.
     */
    private getDefaultClass(): string {
        return 'geovisto-map';
    }

    /**
     * Draw map after component is rendered
     */
    public componentDidMount(): void {

        // After all children are mounted

        // create new Geovisto map
        this.m = Geovisto.createMap(this.props);

        // draw map with the current config
        this.m.draw(this.props.config ?? Geovisto.getMapConfigManagerFactory().default({}));
    }

    /**
     * Redraw map after component is updated
     */
    public componentDidUpdate(): void {
        // redraw map with a new config and new props
        // this.m.redraw(this.props.config ?? Geovisto.getMapConfigManagerFactory().default({}), this.props);
    }

    /**
     * The render function prepares a wrapper which will be used by Geovisto/Leaflet to render the map.
     */
    public render(): JSX.Element {
        return <div id={this.props.id} className={this.getDefaultClass()} />;
    }
}
export default ReactGeovistoMap;
