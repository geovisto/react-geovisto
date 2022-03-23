// leaflet
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Geovisto Themes Tool API
import {
    IMapTheme,
    IThemesToolAPI,
    IThemesToolAPIGetter
} from '../../../../../themes';

// Geovisto core
import {
    AbstractLayerTool,
    IMapChangeEvent,
    IMapEvent,
    IMapForm,
    IMapFormControl,
    IMapTilesModel,
    IMapToolInitProps
} from '../../../../../../index.core';

import IBlueSkyLayerTool from '../../types/tool/IBlueSkyLayerTool';
import IBlueSkyLayerToolConfig from '../../types/tool/IBlueSkyLayerToolConfig';
import IBlueSkyLayerToolDefaults from '../../types/tool/IBlueSkyLayerToolDefaults';
import IBlueSkyLayerToolState from '../../types/tool/IBlueSkyLayerToolState';
import IBlueSkyLayerToolProps from '../../types/tool/IBlueSkyLayerToolProps';
import BlueSkyLayerToolDefaults from './BlueSkyLayerToolDefaults';
import BlueSkyLayerToolMapForm from '../form/BlueSkyLayerToolMapForm';
import BlueSkyLayerToolState from './BlueSkyLayerToolState';
import { LatLngBoundsLiteral } from 'leaflet';

/**
 * This class represents Map layer tool. It use tile layer and OSM maps.
 * 
 * @author Jiri Hynek
 */
class BlueSkyLayerTool extends AbstractLayerTool implements IBlueSkyLayerTool, IMapFormControl {
    
    private themesToolAPI: IThemesToolAPI | undefined;
    private mapForm!: IMapForm;

    /**
     * It creates a new tool with respect to the props.
     * 
     * @param props 
     */
    public constructor(props?: IBlueSkyLayerToolProps) {
        super(props);
    }

    /**
     * It creates a copy of the uninitialized tool.
     */
    public copy(): IBlueSkyLayerTool {
        return new BlueSkyLayerTool(this.getProps());
    }

    /**
     * Help function which returns the props given by the programmer.
     */
    public getProps(): IBlueSkyLayerToolProps {
        return <IBlueSkyLayerToolProps> super.getProps();
    }

    /**
     * It returns default values of the state properties.
     */
    public getDefaults(): IBlueSkyLayerToolDefaults {
        return <IBlueSkyLayerToolDefaults> super.getDefaults();
    }

    /**
     * It creates new defaults of the layer tool.
     */
    protected createDefaults(): IBlueSkyLayerToolDefaults {
        return new BlueSkyLayerToolDefaults();
    }

    /**
     * It returns the layer tool state.
     */
    public getState(): IBlueSkyLayerToolState {
        return <IBlueSkyLayerToolState> super.getState();
    }

    /**
     * It creates new defaults of the layer tool.
     */
    protected createState(): IBlueSkyLayerToolState {
        return new BlueSkyLayerToolState(this);
    }

    /**
     * It returns a sidebar tab with respect to the configuration.
     */
    public getMapForm(): IMapForm {
        if(this.mapForm == undefined) {
            this.mapForm = this.createMapForm();
        }
        return this.mapForm;
    }

    /**
     * It creates new tab control.
     */
    protected createMapForm(): IMapForm {
        // override if needed
        return new BlueSkyLayerToolMapForm(this);
    }

    /**
     * Help function which acquires and returns the themes tool if available.
     */
    private getThemesTool(): IThemesToolAPI | undefined {
        if(this.themesToolAPI == undefined) {
            const api = this.getMap()?.getState().getToolsAPI() as IThemesToolAPIGetter;
            if(api.getGeovistoThemesTool) {
                this.themesToolAPI = api.getGeovistoThemesTool();
            }
        }
        return this.themesToolAPI;
    }

    /**
     * Overrides the super method.
     * 
     * @param initProps
     */
    public initialize(initProps: IMapToolInitProps<IBlueSkyLayerToolConfig>): this {
        return super.initialize(initProps);
    }

    /**
     * It creates layer items.
     */
    protected createLayerItems(): L.Layer[] {
        // create a tile layer
        const layer: L.ImageOverlay = this.createTileLayer();

        // update state
        this.getState().setTileLayer(layer);

        return [ layer ];
    }

    /**
     * Creates new tile layer
     * 
     * @param tilesModel 
     */
    protected createTileLayer(): L.ImageOverlay {

        const map: L.Map | undefined = this.getMap()?.getState().getLeafletMap();
        
        // const imageUrl = 'https://wallpaper.dog/large/20467117.jpg';
        const imageUrl = 'https://cdn.mos.cms.futurecdn.net/mZb3Q79jgPAXAcag7CutLW-970-80.jpg.webp';
        const imageBounds = [[48.53354938782338, 30.981159911978207], [78.40767963203979, 175.82490922080703]];
        
        const layer: L.ImageOverlay = L.imageOverlay(imageUrl, imageBounds as LatLngBoundsLiteral).addTo(map!);
        return layer;
    }

    /**
     * This function is called when a custom event is invoked.
     * 
     * @param event 
     */
    public handleEvent(event: IMapEvent): void {
        if(event.getType() == this.getThemesTool()?.getChangeEventType()) {
            this.onThemeChange(<IMapTheme> (<IMapChangeEvent> event).getChangedObject());
        }
    }

    /**
     * This function updates theme used in the tool.
     */
    protected onThemeChange(theme: IMapTheme): void {
        // update base map
        // this.getState().setBaseMap(theme.getBaseMap());

        let layer: L.ImageOverlay | undefined = this.getState().getTileLayer();
        // TODO: use public API
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if(layer && (layer as any)._url != theme.getBaseMap()) {
            // remove the old layer
            const leafltMap = this.getMap()?.getState().getLeafletMap();
            if(leafltMap) {
                leafltMap.removeLayer(layer);

                // create a new tile layer
                layer = this.createTileLayer();

                // update state
                this.getState().setTileLayer(layer);

                // add the new layer to the leaflet map
                layer.addTo(leafltMap);
            }
        }
    }
}

export default BlueSkyLayerTool;